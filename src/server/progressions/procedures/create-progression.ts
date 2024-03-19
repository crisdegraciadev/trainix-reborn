import { privateProcedure } from "@server/trpc";
import { TRPCError } from "@trpc/server";
import { activitySchema } from "@typings/schemas/activity";
import { improvementSchema } from "@typings/schemas/improvement";
import { convertToUTC } from "@utils/convert-to-utc";
import { z } from "zod";

export const createProgression = privateProcedure
  .input(
    z.object({
      workoutId: z.string(),
      progression: z.object({ date: z.date(), activities: z.array(activitySchema) }),
      currentProgressionId: z.string().optional(),
      improvements: z.array(improvementSchema).optional(),
    })
  )
  .mutation(async ({ input }) => {
    const { workoutId, progression, improvements, currentProgressionId } = input;
    const { date, activities } = progression;

    const createdAt = convertToUTC(date);

    return prisma?.$transaction(async (tx) => {
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

      // If it's not the first progression, update the old one with the improvements
      if (improvements && currentProgressionId) {
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
          activities.map(async ({ id: activityId }) => {
            const activityUpdate = improvements.find(
              (improvement) => improvement.activityId === activityId
            );

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
          })
        );
      }

      return tx.progression.findFirst({
        where: { id: progressionId },
        include: {
          activities: { include: { exercise: true, improve: true } },
        },
      });
    });
  });
