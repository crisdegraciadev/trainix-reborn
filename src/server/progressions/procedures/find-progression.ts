import db from "@lib/prisma";
import { privateProcedure } from "@server/trpc";
import { ActivityWithExercise } from "@typings/entities/activity";
import { ProgressionDetails } from "@typings/entities/progression";
import { z } from "zod";
import { buildTodayDateFilter } from "../utils/build-today-date-filter";
import { TRPCError } from "@trpc/server";

export const findProgression = privateProcedure
  .input(z.object({ workoutId: z.string(), id: z.string().optional(), date: z.date().optional() }))
  .query(async ({ input }): Promise<ProgressionDetails | null> => {
    const { workoutId, id, date } = input;

    const dateFilter = date ? buildTodayDateFilter(date) : {};

    console.log("Finding progression with filters", {
      where: { id, workoutId, ...dateFilter },
    });

    const progression = await db.progression.findFirst({
      where: {
        id,
        workoutId,
        ...dateFilter,
      },
      orderBy: { createdAt: "desc" },
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

    if (!progression) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Progression not found" });
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
