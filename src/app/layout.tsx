import type { Metadata } from "next";

import "./globals.css";
import UserAuthContext from "@/context/userContext";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <body>
          {" "}
          {children}
          <ToastContainer />
        </body>
      </UserAuthContext>
    </html>
  );
}
