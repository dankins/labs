import { brands } from "@danklabs/cake/services/admin-service";

export async function DashboardPage({ slug }: { slug: string }) {
  const brand = await brands.getBrand(slug);
  return (
    <div>
      <div className="my-10 flex flex-col items-center justify-center">
        <div className="container">
          <div>brand admin: {slug}</div>
          <div>id: {brand.db.id}</div>
          <div>{/* <AuthorizeButton slug={slug} /> */}</div>
        </div>
      </div>
    </div>
  );
}
