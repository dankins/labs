import localFont from "next/font/local";

export const apris = localFont({
  variable: "--font-apris",
  src: [
    {
      path: "./apris-v10-woff/Apris-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./apris-v10-woff/Apris-Thin.woff2",
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

export const selva = localFont({
  variable: "--font-selva",
  src: [
    {
      path: "./selva-script/selva-script-regular-pro.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./selva-script/selva-script-light-pro.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./selva-script/selva-script-medium-pro.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const fonts = [supreme, apris, selva];
