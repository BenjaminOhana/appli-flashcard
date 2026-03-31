import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { IrregularVerbsModal } from "@/components/IrregularVerbsModal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlashTalk",
  description: "Learn English with Notion Flashcards",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "FlashTalk",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased bg-[#FDFBF7] text-[#1C2A21] selection:bg-[#CA5D3A]/20">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
        <IrregularVerbsModal />
      </body>
    </html>
  );
}
