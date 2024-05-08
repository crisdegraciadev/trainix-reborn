import { PropsWithChildren } from "react";
import AuthProvider from "./auth";
import TrpcProvider from "./trpc";
import { TooltipProvider } from "@components/ui/tooltip";
import { ThemeProvider } from "./theme";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <TrpcProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </TrpcProvider>
    </AuthProvider>
  );
}
