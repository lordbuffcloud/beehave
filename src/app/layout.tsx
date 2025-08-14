import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beehave - Family Chore & Allowance Manager",
  description: "A PWA for managing family chores, allowances, and spending requests with gamification for kids",
  keywords: ["chores", "allowance", "family", "kids", "gamification", "honey", "bee"],
  authors: [{ name: "Beehave Team" }],
  creator: "Beehave",
  publisher: "Beehave",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Beehave",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://beehave.app",
    title: "Beehave - Family Chore Manager",
    description: "Gamified chore management for families with honey rewards",
    siteName: "Beehave",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beehave - Family Chore Manager",
    description: "Gamified chore management for families with honey rewards",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbbf24" },
    { media: "(prefers-color-scheme: dark)", color: "#f59e0b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 