import { mainRouter } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: mainRouter.video.title,
  description: mainRouter.video.description,
};

export default function VideoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
