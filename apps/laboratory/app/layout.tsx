import { Poppins } from "next/font/google";

import { AppContainer } from "@danklabs/pattern-library/core";
import "./global.css";
import { Nav } from "./Nav";
import { GradientBackground } from "./GradientBackground";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300"],
});

export const metadata = {
  title: "Dank Labs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <AppContainer>
          {/* <GradientBackground /> */}
          <Nav />
          {children}
        </AppContainer>
      </body>
    </html>
  );
}
