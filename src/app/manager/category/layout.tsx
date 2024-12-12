import { mainRouter } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: mainRouter.category.title,
  description: mainRouter.users.description,
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
