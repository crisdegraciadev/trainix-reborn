import { Muscle, db } from "@trainix/database";

export async function findMuscles(): Promise<Muscle[]> {
  const data = await db.muscle.findMany();

  return data.map(({ id, name, value }) => ({ id, name, value }));
}
