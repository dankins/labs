import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Cake",
    short_name: "Cake",
    description: "Shopping is about to get sweeter.",
    start_url: "/",
    display: "standalone",
    dir: "ltr",
    lang: "en_US",
    background_color: "#fff",
    theme_color: "#fff",
    launch_handler: {
      // @ts-ignore
      client_mode: "navigate-existing",
    },
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
