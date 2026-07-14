import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlphaBuilt Consultants | Premium Inventory Management Solutions",
  description:
    "Streamline operations, boost efficiency, and drive growth with AlphaBuilt Consultants. Real-time inventory tracking, automated reordering, and advanced analytics dashboards.",

  keywords: [
    "inventory management",
    "operations optimization",
    "supply chain consulting",
    "real-time tracking",
    "automated reordering",
    "analytics dashboard",
  ],
  authors: [{ name: "AlphaBuilt Consultants" }],
  openGraph: {
    title: "AlphaBuilt Consultants | Premium Inventory Management",
    description:
      "Streamline operations, boost efficiency, and drive growth with our comprehensive inventory management platform.",
    url: "https://alphabuiltconsultants.com",
    siteName: "AlphaBuilt Consultants",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaBuilt Consultants | Premium Inventory Management",
    description:
      "Streamline operations, boost efficiency, and drive growth with our comprehensive inventory management platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-white text-[#020F2E] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
