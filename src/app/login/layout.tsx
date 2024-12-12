import { gereralSans, mainRouter, sfProDisplay } from "@/config";
import clsx from "clsx";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: mainRouter.login.title,
  description: mainRouter.login.description,
};

export default function AuthenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(gereralSans.variable, sfProDisplay.variable)}>
        {children}
      </body>
    </html>
  );
}
