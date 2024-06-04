import Elysia from "elysia";
import { findMuscles } from "./services/find-all";

export const muscles = new Elysia({ prefix: "/muscles" });

muscles.get("", () => findMuscles());
