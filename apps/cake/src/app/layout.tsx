import { SpeedInsights } from "@vercel/speed-insights/next";

// If loading a variable font, you don't need to specify the font weight

import "./global.scss";
import { PWAProvider } from "./PWAProvider";
import classNames from "classnames";
import { ToastProvider } from "@danklabs/pattern-library/motion";
import { EventProvider } from "@danklabs/cake/events";
import { fonts } from "@danklabs/cake/pattern-library/core";

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
          fonts.map((f) => f.variable),
          "bg-neutral text-neutral-content"
        )}
      >
        <head>
          <link rel="apple-touch-icon" href="/favicon-512x512.png"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <EventProvider>
            <ToastProvider>{children}</ToastProvider>
          </EventProvider>
          <SpeedInsights />
        </body>
      </html>
    </PWAProvider>
  );
}
