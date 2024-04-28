import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { TRPCError } from "@trpc/server";
import { PrismaTx } from "@typings/prisma";
import { activitySchema } from "@typings/schemas/activity";
import { ImprovementSchema, improvementSchema } from "@typings/schemas/improvement";
import { z } from "zod";
import { buildTodayDateFilter } from "../utils/build-today-date-filter";

export const createProgression = privateProcedure
  .input(
    z.object({
      workoutId: z.string(),
      progression: z.object({ date: z.date(), activities: z.array(activitySchema) }),
      currentProgressionId: z.string().optional(),
      improvements: z.array(improvementSchema).optional(),
    }),
  )
  .mutation(async ({ input }) => {
    const { workoutId, progression, improvements, currentProgressionId } = input;
    const { date, activities } = progression;

    console.log("Create new progression with input", { date });

    const createdAt = date;
    const todayFilter = buildTodayDateFilter(createdAt);

    console.log("Formatted date to UTC", { createdAt });

    return db.$transaction(async (tx) => {
      // Check if there is some progression on this date
      const progressionOnSameDate = await tx.progression.findFirst({
        where: { ...todayFilter },
      });

      // Delete it to replace it with the incomming progression
      if (progressionOnSameDate) {
        console.log("Progression on same date found", { progressionOnSameDate });

        await tx.progression.delete({
          where: { id: progressionOnSameDate.id },
        });
      }

      // Create progression entity
      const newProgression = await tx.progression.create({
        data: {
          workoutId,
          createdAt,
        },
      });

      const { id: progressionId } = newProgression;

      // Create the activities and link them to the progression (improve unset)
      const activitiesToCreate = activities.map((activity) => ({
        ...activity,
        progressionId,
      }));

      await tx.acticity.createMany({ data: activitiesToCreate });

      // If it's not the first progression, update the anterior with the improvements
      const progressionsCount = await tx.progression.count();
      const isLastUpdatable =
        progressionsCount > 1 &&
        improvements &&
        currentProgressionId &&
        currentProgressionId !== progressionOnSameDate?.id;

      if (isLastUpdatable) {
        await updateOldProgression(tx, { improvements, currentProgressionId });
      }

      // Finally return the created progression
      return tx.progression.findFirst({
        where: { id: progressionId },
        include: {
          activities: { include: { exercise: true, improve: true } },
        },
      });
    });
  });

type UpdateOldProgressionArgs = {
  currentProgressionId: string;
  improvements: ImprovementSchema[];
};

const updateOldProgression = async (tx: PrismaTx, args: UpdateOldProgressionArgs) => {
  const { currentProgressionId, improvements } = args;

  const oldProgression = await tx.progression.findUnique({
    where: { id: currentProgressionId },
    include: { activities: true },
  });

  if (!oldProgression) {
    throw new TRPCError({ message: "Current Progression not found", code: "NOT_FOUND" });
  }

  const { activities } = oldProgression;

  // Update the improve state in each activity
  await Promise.all(
    activities.map(async ({ id: activityId }) =>
      updateActivities(tx, { improvements, activityId }),
    ),
  );
};

type UpdateActivitiesArgs = {
  activityId: string;
  improvements: ImprovementSchema[];
};

const updateActivities = async (tx: PrismaTx, args: UpdateActivitiesArgs) => {
  const { activityId, improvements } = args;

  const activityUpdate = improvements.find((improvement) => improvement.activityId === activityId);

  if (!activityUpdate) {
    throw new Error("This seems like a bug");
  }

  const { improve } = activityUpdate;

  const improvementOption = await tx.improve.findUnique({ where: { value: improve } });

  if (!improvementOption) {
    throw new TRPCError({ message: "Improvement Option not found", code: "NOT_FOUND" });
  }

  const { id: improveId } = improvementOption;

  await tx.acticity.update({
    where: { id: activityId },
    data: { improveId },
  });
};
