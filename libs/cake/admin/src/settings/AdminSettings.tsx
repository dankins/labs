import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";
import { ManageAdmins } from "./ManageAdmins";

export async function AdminSettings() {
  return (
    <div>
      <div className="mt-[91px]" />
      <div className="mx-auto container">
        <ManageAdmins />
      </div>
    </div>
  );
}
