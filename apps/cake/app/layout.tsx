import { AppContainer } from "@danklabs/pattern-library/core";
import "./global.css";
import { ServiceWorkerProvider } from "./ServiceWorkerProvider";

export const metadata = {
  title: "Cake",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServiceWorkerProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>{children}</body>
      </html>
    </ServiceWorkerProvider>
  );
}
