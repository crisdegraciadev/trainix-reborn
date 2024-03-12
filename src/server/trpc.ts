import { initTRPC } from "@trpc/server";
import { checkAuthorized } from "../utils/check-authorized";
import SuperJSON from "superjson";

const t = initTRPC.create({
  transformer: SuperJSON,
});

const isAuth = t.middleware(async ({ ctx, next }) => {
  await checkAuthorized();

  return next();
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
