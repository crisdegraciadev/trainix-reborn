import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Toaster } from "@components/ui/toaster";
import Providers from "@providers/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trainix",
  description: "A simple workout tracker.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
