import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { LoadingBar } from "@/components/common/loading-bar";
import { ClientOnly } from "@/components/providers/client-only";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhupati Info Solution - Top brands. True performance. Fair prices | Custom PC Builder & Computer Parts",
  description: "Premium PC hardware store specializing in custom-built computers, components, and accessories. Build your dream PC with our online PC builder tool.",
  icons: {
    icon: '/main_logo.png',
    shortcut: '/tra_logo.png',
    apple: '/main_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ClientOnly>
          <LoadingBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
