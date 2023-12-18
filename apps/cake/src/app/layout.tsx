import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./global.css";
import { PWAProvider } from "./PWAProvider";
import { Flowbite } from "./Flowbite";

export const metadata = {
  title: "Cake",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flowbite>
      <ClerkProvider>
        <PWAProvider>
          <html lang="en">
            <head>
              <link rel="apple-touch-icon" href="/favicon-512x512.png"></link>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </head>
            <body>
              {children}
              <SpeedInsights />
            </body>
          </html>
        </PWAProvider>
      </ClerkProvider>
    </Flowbite>
  );
}
