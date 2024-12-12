import { mainRouter } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: mainRouter.volunteer.title,
  description: mainRouter.volunteer.description,
};

export default function VolunteersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
