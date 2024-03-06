import { getBrand } from "@danklabs/cake/services/admin-service";

export async function ManageBrandAdmins({ slug }: { slug: string }) {
  const brand = await getBrand(slug);
  return (
    <div>
      {brand.admins.length === 0 ? (
        <div>No Brand admins</div>
      ) : (
        <div>{brand.admins.join(",")}</div>
      )}
    </div>
  );
}
