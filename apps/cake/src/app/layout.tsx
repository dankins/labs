import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight

import "./global.css";
import { PWAProvider } from "./PWAProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cake",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PWAProvider>
      <html lang="en">
        <head>
          <link rel="apple-touch-icon" href="/favicon-512x512.png"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={inter.className}>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </PWAProvider>
  );
}
