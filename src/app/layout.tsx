import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Overage — Stop Doing Free Work For Your Clients",
  description:
    "Track scope additions, calculate unbilled work, and generate professional scope change reports. Built for freelancers who are tired of eating the cost of 'just one more thing.'",
  metadataBase: new URL(process.env.BETTER_AUTH_URL || "https://overage.app"),
  openGraph: {
    title: "Overage — Stop Doing Free Work For Your Clients",
    description:
      "Track scope additions, calculate unbilled work, and generate professional scope change reports.",
    url: process.env.BETTER_AUTH_URL || "https://overage.app",
    siteName: "Overage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overage — Stop Doing Free Work For Your Clients",
    description:
      "Track scope additions, calculate unbilled work, and generate professional scope change reports.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
