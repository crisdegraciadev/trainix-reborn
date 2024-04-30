"use client";

import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../server/client";
import superjson from "superjson";

const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      retryDelay: 500,
    },
  },
};

export default function TrpcProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_CONFIG));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`,
        }),
      ],
      transformer: superjson,
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
