import { z } from "zod";

export const muscleSchema = z.object(
  { id: z.string(), value: z.string(), name: z.string() },
  { required_error: "Select at least one muscle" }
);
