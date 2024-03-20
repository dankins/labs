import { Heading1 } from "@danklabs/cake/pattern-library/core";
import { cachedGetSuperAdmins } from "@danklabs/cake/services/admin-service";
import { PrimaryButton, TextInput } from "@danklabs/pattern-library/core";
import { addSuperAdminAction } from "./actions";

export async function ManageAdmins() {
  const superAdmins = await cachedGetSuperAdmins();
  return (
    <>
      <Heading1 className="text-xl">Super Admins</Heading1>
      <div className="mt-5 p-4 rounded-md bg-white ">
        {superAdmins.map((sa) => (
          <SuperAdminRow
            key={sa.id}
            email={sa.user.emailAddresses[0].emailAddress}
            role={sa.role}
          />
        ))}
      </div>
      <div className="flex flex-row justify-end">
        <AddSuperAdmin />
      </div>
    </>
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

function AddSuperAdmin() {
  return (
    <form
      className="mt-3 flex flex-row items-center gap-2"
      action={addSuperAdminAction}
    >
      <div>
        <TextInput
          name="email"
          placeholder="Admin Email Address"
          className="w-64"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        />
      </div>
      <PrimaryButton type="submit">Add Admin</PrimaryButton>
    </form>
  );
}
