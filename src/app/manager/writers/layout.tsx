import { mainRouter } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: mainRouter.writer.title,
  description: mainRouter.writer.description,
};

export default function WriterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
