import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://harshalkudale.com'),
  title: {
    default: "Harshal Kudale | Software Engineer",
    template: "%s | Harshal Kudale",
  },
  description: "Software Engineer III specializing in Java, Spring Boot, and Microservices. Building secure, scalable financial technology solutions.",
  keywords: ["Software Engineer", "Full Stack Developer", "Java", "Spring Boot", "React", "Next.js", "Microservices", "FinTech"],
  authors: [{ name: "Harshal Kudale" }],
  creator: "Harshal Kudale",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshalkudale.com",
    title: "Harshal Kudale | Software Engineer",
    description: "Software Engineer III specializing in Java, Spring Boot, and Microservices. Building secure, scalable financial technology solutions.",
    siteName: "Harshal Kudale",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Harshal Kudale - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshal Kudale | Software Engineer",
    description: "Software Engineer III specializing in Java, Spring Boot, and Microservices.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Harshal Kudale',
    jobTitle: 'Software Engineer III',
    url: 'https://harshalkudale.com',
    sameAs: [
      'https://github.com/HarshalKudale',
      'https://linkedin.com/in/harshalkudale',
      // Add other social links if available in links.json
    ],
    description: "Software Engineer III specializing in Java, Spring Boot, and Microservices architecture.",
    image: 'https://harshalkudale.com/profile.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressCountry: 'IN'
    },
    email: 'contact@harshalkudale.com'
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
