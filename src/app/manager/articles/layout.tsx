import { mainRouter } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: mainRouter.article.title,
  description: mainRouter.article.description,
};

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
