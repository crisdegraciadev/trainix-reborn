import { Elysia } from "elysia";
import { difficulties, exercises, muscles, workouts } from "./resources";

const app = new Elysia()
  .use(muscles)
  .use(workouts)
  .use(difficulties)
  .use(exercises)
  .listen(3000);

console.log(
  `🦊 Elysia is running on ${app.server?.hostname}:${app.server?.port}`,
);
