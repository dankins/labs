import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { brands } from "@danklabs/cake/services/admin-service";
import { addManagerAction } from "../../actions";
import { FormAction, TextInput } from "@danklabs/pattern-library/core";

export async function ManageBrandManagers({ slug }: { slug: string }) {
  const brand = await brands.getBrand(slug);
  return (
    <div className="px-4 py-2 rounded-md shadow-md bg-white">
      <SectionHeading>Brand Managers</SectionHeading>
      {brand.db.admins.length === 0 ? (
        <div>No Brand Managers</div>
      ) : (
        <div>
          {brand.db.admins.map((manager) => (
            <ManagerRow
              key={manager.email}
              email={manager.email}
              role={manager.role}
            />
          ))}
        </div>
      )}

      <div className="w-full flex flex-row justify-end">
        <AddManager brandSlug={brand.db.slug} />
      </div>
    </div>
  );
}

export function ManagerRow({ email, role }: { email: string; role: string }) {
  return (
    <div>
      <span>{email}</span>
    </div>
  );
}

export function SuperAdminRow({
  email,
  role,
}: {
  email: string;
  role: string;
}) {
  return (
    <div>
      <span>{email}</span>
    </div>
  );
}

function AddManager({ brandSlug }: { brandSlug: string }) {
  return (
    <FormAction
      className="mt-3 flex flex-row items-center gap-2"
      action={addManagerAction.bind(undefined, brandSlug)}
      cta="Add Admin"
      inline
    >
      <TextInput
        name="email"
        placeholder="Manager Email Address"
        className="w-64"
        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
      />
    </FormAction>
  );
}
