import { TRPCError, initTRPC } from "@trpc/server";
import { checkAuthorized } from "../utils/use-auth";

const t = initTRPC.create();

const isAuth = t.middleware(async ({ ctx, next }) => {
  await checkAuthorized();

  return next();
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
