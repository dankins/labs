import { getBrand } from "@danklabs/cake/services/admin-service";

export async function DashboardPage({ slug }: { slug: string }) {
  const brand = await getBrand(slug);
  return (
    <div>
      <div className="my-10 flex flex-col items-center justify-center">
        <div className="container">
          <div>brand admin: {slug}</div>
          <div>id: {brand.id}</div>
          <div>{/* <AuthorizeButton slug={slug} /> */}</div>
        </div>
      </div>
    </div>
  );
}
