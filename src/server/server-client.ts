import { httpBatchLink } from "@trpc/client";
import { appRouter } from ".";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});
