import { privateProcedure } from "@server/trpc";
import { activitySchema } from "@typings/schemas/activity";
import { z } from "zod";

export const createProgression = privateProcedure
  .input(
    z.object({
      workoutId: z.string(),
      progression: z.object({ date: z.string(), activities: z.array(activitySchema) }),
    })
  )
  .mutation(async ({ input }) => {
    const { workoutId, progression } = input;
    const { date, activities } = progression;

    return prisma?.$transaction(async (tx) => {
      const createdProgression = await tx.progression.create({
        data: {
          workoutId,
          createdAt: new Date(date),
        },
      });

      const { id: progressionId } = createdProgression;

      const activitiesToCreate = activities.map((activity) => ({
        ...activity,
        progressionId,
      }));

      await tx.acticity.createMany({ data: activitiesToCreate });

      return tx.progression.findFirst({
        where: { id: progressionId },
        include: {
          activities: { include: { exercise: true, improve: true } },
        },
      });
    });
  });
