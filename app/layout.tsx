import type { Metadata } from "next";
import "./globals.css";
import { ModeProvider } from "@/lib/ModeContext";
import { MatrixBackground } from "@/components/shared/MatrixBackground";
import { FluidShapes } from "@/components/home/FluidShapes";

export const metadata: Metadata = {
  title: {
    default: "Noel Joseph Varghese | Software Developer & Designer",
    template: "%s | Noel Joseph Varghese",
  },
  description: "Portfolio of Noel Joseph Varghese. I am a passionate software developer and designer specializing in building modern web applications, creative interfaces, and robust systems.",
  keywords: ["Noel Joseph Varghese", "Noel Varghese", "Software Developer", "Web Developer", "Frontend Developer", "Full Stack Developer", "Designer", "UX/UI", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Noel Joseph Varghese" }],
  creator: "Noel Joseph Varghese",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Noel Joseph Varghese | Software Developer & Designer",
    description: "Portfolio of Noel Joseph Varghese. I am a passionate software developer and designer.",
    siteName: "Noel Joseph Varghese Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noel Joseph Varghese | Software Developer & Designer",
    description: "Portfolio of Noel Joseph Varghese. I am a passionate software developer and designer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ModeProvider>
          <MatrixBackground />
          <FluidShapes />
          {children}
        </ModeProvider>
      </body>
    </html>
  );
}
