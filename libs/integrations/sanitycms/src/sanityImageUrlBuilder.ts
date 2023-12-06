import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";

export const sanityImageUrlBuilder = imageUrlBuilder(sanityClient);
