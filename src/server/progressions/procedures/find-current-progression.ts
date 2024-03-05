import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { ActivityMerge } from "@typings/entities/activity";
import { ProgressionDetails } from "@typings/entities/progression";
import { z } from "zod";

export const findCurrentProgression = privateProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }): Promise<ProgressionDetails | null> => {
    const { id } = input;

    const progression = await db.progression.findFirst({
      where: { id },
      orderBy: { createdAt: "desc" },
      include: {
        activities: {
          include: {
            exercise: {
              include: {
                muscles: true,
                difficulty: true,
              },
            },
          },
        },
      },
    });

    if (!progression) {
      return null;
    }

    const { activities, createdAt } = progression;

    const mappedActivities: ActivityMerge[] = activities.map((activity) => {
      const { id, exercise, sets, reps } = activity;

      const { difficulty, muscles, description } = exercise;
      const { level, ...difficultyRest } = difficulty;

      return {
        ...activity,
        ...exercise,
        id,
        total: sets * reps,
        difficulty: { ...difficultyRest },
        description: description ?? "",
        muscles: muscles.map(({ id, name, value }) => ({ id, name, value })),
      };
    });

    return {
      ...progression,
      createdAt: createdAt.toString(),
      activities: mappedActivities,
    };
  });
