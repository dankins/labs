import { brands, shopify } from "@danklabs/cake/services/admin-service";

const commonToken = process.env["SHOPIFY_COMMON_TOKEN"]!;

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const result = parseAuthorizationHeader(authHeader);
  if (!result.matches) {
    return new Response("Invalid authorization header", { status: 401 });
  }
  const { slug, token } = result;

  const brand = await brands.getBrand(slug);
  if (!brand) {
    console.log("could not find brand", slug);
    return new Response("Unauthorized", { status: 401 });
  }
  if (token !== commonToken) {
    console.log("provided token does not match", token);
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = await req.json();

  await shopify.handleCheckoutCompletedEvent(slug, payload);
  return new Response("ok", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function OPTIONS(req: Request) {
  return new Response("ok", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function parseAuthorizationHeader(
  header: string | null
):
  | { matches: true; slug: string; token: string }
  | { matches: false; slug?: undefined; token?: undefined } {
  if (header === null) {
    console.error("Authorization header not present");
    return { matches: false };
  }
  const pattern = /^Bearer ([a-zA-Z0-9-_]+)\|(.+)$/;
  const match = header.match(pattern);

  if (match) {
    const slug = match[1];
    const token = match[2];
    return { matches: true, slug, token };
  } else {
    // Handle the case where the string does not match the pattern
    console.error("Invalid authorization header format");
    return { matches: false };
  }
}
