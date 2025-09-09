import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: "Flow Drive",
  description: "App for managing your files in Flow Drive",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}