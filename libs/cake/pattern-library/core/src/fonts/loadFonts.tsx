import localFont from "next/font/local";

console.log("load font");

export const apris = localFont({
  variable: "--font-apris",
  src: [
    {
      path: "./apris-v10-otps/Apris-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./apris-v10-otps/Apris-Thin.otf",
      weight: "300",
      style: "normal",
    },
  ],
});

export const supreme = localFont({
  variable: "--font-supreme",
  src: [
    {
      path: "./SupremeLLWeb/SupremeLLWeb-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SupremeLLWeb/SupremeLLWeb-Thin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./SupremeLLWeb/SupremeLLWeb-Regular.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export function loadFonts() {}
