import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteLoader } from "./components/site-loader";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://aceya-saints.rabilibraiel.chatgpt.site";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Paradise of the Fathers",
  description:
    "An independent educational archive exploring the saints, martyrs, teachers, and missionaries of the Church of the East.",
  openGraph: {
    title: "The Paradise of the Fathers",
    description:
      "Lives that carried the light eastward: an educational archive of the Church of the East.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${basePath}/og.png`,
        width: 1747,
        height: 909,
        alt: "The Paradise of the Fathers — Lives that carried the light eastward",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Paradise of the Fathers",
    description:
      "Lives that carried the light eastward: an educational archive of the Church of the East.",
    images: [`${basePath}/og.png`],
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
