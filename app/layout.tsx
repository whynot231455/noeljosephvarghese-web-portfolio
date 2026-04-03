import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, JetBrains_Mono, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ModeProvider } from "@/lib/ModeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display-creative" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-serif-creative" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-dev" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-display-dev" });

export const metadata: Metadata = {
  title: "Noel Joseph Varghese | Designer & Developer",
  description: "Personal portfolio of Noel Joseph Varghese.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${jetbrains.variable} ${spaceMono.variable} antialiased`} suppressHydrationWarning>
        <ModeProvider>
          {children}
        </ModeProvider>
      </body>
    </html>
  );
}
