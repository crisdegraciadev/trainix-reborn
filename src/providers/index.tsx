import { PropsWithChildren } from "react";
import AuthProvider from "./auth";
import TrpcProvider from "./trpc";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <TrpcProvider>{children}</TrpcProvider>
    </AuthProvider>
  );
}
