import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const muscles = [
  { name: "Chest", value: "chest" },
  { name: "Triceps", value: "triceps" },
  { name: "Biceps", value: "biceps" },
  { name: "Forearms", value: "forearms" },
  { name: "Back", value: "back" },
  { name: "Shoulders", value: "shoulders" },
  { name: "Core", value: "core" },
  { name: "Glutes", value: "glutes" },
  { name: "Calves", value: "calves" },
  { name: "Quadriceps", value: "quadriceps" },
  { name: "Hamstrings", value: "hamstrings" },
  { name: "Trapezius", value: "trapezius" },
];
async function main() {
  for (const muscle of muscles) {
    const isFound = await prisma.muscle.findFirst({
      where: {
        value: muscle.value,
      },
    });

    if (!isFound) {
      const added = await prisma.muscle.create({ data: muscle });
      console.log("Muscle added", added);
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
