import type { Metadata } from "next";

import "./globals.css";
import UserAuthContext from "@/context/userContext";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Buy&Sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <UserAuthContext>
        <body> {children}</body>
      </UserAuthContext>
    </html>
  );
}
