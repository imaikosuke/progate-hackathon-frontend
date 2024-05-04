import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "旅ルート",
  description: "Progate Hackathon #1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Suspense fallback={<div>Loading...</div>}>
        <body className={inter.className}>{children}</body>
      </Suspense>
    </html>
  );
}
