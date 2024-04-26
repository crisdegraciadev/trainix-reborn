import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const users = [
  {
    name: "cristian",
    surname: "de gracia nuero",
    email: "test@test.com",
    passwordHash: bcrypt.hashSync("123456789", 8),
  },
];

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
  { name: "Hip", value: "hip" },
];

const difficulties = [
  { name: "Easy", value: "easy", level: 1 },
  { name: "Medium", value: "medium", level: 2 },
  { name: "Hard", value: "hard", level: 3 },
];

const improveStates = [
  { name: "Improve", value: "+" },
  { name: "Keep working", value: "=" },
  { name: "Regression", value: "-" },
];

async function main() {
  for (const user of users) {
    const isFound = await prisma.user.findFirst({
      where: { email: user.email },
    });

    if (!isFound) {
      const added = await prisma.user.create({ data: user });
      console.log("User added", added);
    }
  }

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

  for (const difficulty of difficulties) {
    const isFound = await prisma.difficulty.findFirst({
      where: {
        value: difficulty.value,
      },
    });

    if (!isFound) {
      const added = await prisma.difficulty.create({ data: difficulty });
      console.log("Difficulty added", added);
    }
  }

  for (const improveState of improveStates) {
    const isFound = await prisma.improve.findFirst({
      where: {
        value: improveState.value,
      },
    });

    if (!isFound) {
      const added = await prisma.improve.create({ data: improveState });
      console.log("Improve state added", added);
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
