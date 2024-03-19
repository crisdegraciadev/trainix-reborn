import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { ActivityWithExercise } from "@typings/entities/activity";
import { ProgressionDetails } from "@typings/entities/progression";
import { z } from "zod";

export const findLastProgression = privateProcedure
  .input(z.object({ workoutId: z.string(), isCompleted: z.boolean().default(false) }))
  .query(async ({ input }): Promise<ProgressionDetails | null> => {
    const { workoutId, isCompleted } = input;

    const [currentProgression, lastCompletedProgression] = await db.progression.findMany({
      where: { workoutId },
      orderBy: { createdAt: "desc" },
      take: 2,
      include: {
        activities: {
          include: {
            improve: true,
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

    const progression = isCompleted
      ? lastCompletedProgression ?? currentProgression
      : currentProgression;

    if (!progression) {
      return null;
    }

    const { activities, createdAt } = progression;

    const mappedActivities: ActivityWithExercise[] = activities
      .map((activity) => {
        const { id, exercise, sets, reps, improve } = activity;

        const { difficulty, muscles, description } = exercise;
        const { level, ...difficultyRest } = difficulty;

        return {
          ...activity,
          ...exercise,
          id,
          total: sets * reps,
          difficulty: { ...difficultyRest },
          improve: improve,
          description: description ?? "",
          muscles: muscles.map(({ id, name, value }) => ({ id, name, value })),
        };
      })
      .toSorted((a, b) => a.order - b.order);

    return {
      ...progression,
      createdAt,
      activities: mappedActivities,
    };
  });
