import { PropsWithChildren } from "react";
import AuthProvider from "./auth";
import TrpcProvider from "./trpc";
import { TooltipProvider } from "@components/ui/tooltip";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <TrpcProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </TrpcProvider>
    </AuthProvider>
  );
}
