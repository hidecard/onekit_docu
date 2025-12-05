import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "@/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneKit JS - Simple DOM utilities and reactive state helpers",
  description: "Modern JavaScript utilities for reactive state management, DOM manipulation, and component development. Works seamlessly with React, Vue, Svelte, or vanilla JavaScript.",
  keywords: ["OneKit", "JavaScript", "DOM", "Reactive", "State Management", "React", "Vue", "Svelte"],
  authors: [{ name: "OneKit Team" }],
  openGraph: {
    title: "OneKit JS",
    description: "Simple DOM utilities and reactive state helpers for modern JavaScript apps",
    url: "https://onekit-js.vercel.app/",
    siteName: "OneKit JS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneKit JS",
    description: "Simple DOM utilities and reactive state helpers for modern JavaScript apps",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
