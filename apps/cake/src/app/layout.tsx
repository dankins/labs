import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { Montserrat } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight

import "./global.css";
import { PWAProvider } from "./PWAProvider";
import classNames from "classnames";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <html
        lang="en"
        className={classNames(
          inter.variable,
          montserrat.variable,
          poppins.variable,
          "bg-neutral text-neutral-content"
        )}
      >
        <head>
          <link rel="apple-touch-icon" href="/favicon-512x512.png"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </PWAProvider>
  );
}
