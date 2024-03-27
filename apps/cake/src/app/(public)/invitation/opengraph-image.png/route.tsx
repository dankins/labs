import { generateOpenGraphImage } from "@danklabs/cake/foyer";
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageResponse = await generateOpenGraphImage(
      searchParams.get("code") || undefined
    );
    return imageResponse;
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
