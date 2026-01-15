import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harshal Kudale | Software Engineer",
  description: "Software Engineer III with 3+ years experience in financial technology, Java/Spring Boot, and Microservices architecture.",
  keywords: ["Software Engineer", "Full Stack Developer", "Java", "Spring Boot", "React", "Next.js"],
  authors: [{ name: "Harshal Kudale" }],
  openGraph: {
    title: "Harshal Kudale | Software Engineer",
    description: "Software Engineer III with 3+ years experience in financial technology solutions.",
    url: "https://portfolio.harshalkudale.com",
    siteName: "Harshal Kudale Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
