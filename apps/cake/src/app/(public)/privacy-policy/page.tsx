import { LogoIcon } from "@danklabs/cake/pattern-library/core";
import { getPage } from "@danklabs/cake/services/admin-service";
export default async function Page() {
  const page = await getPage("terms-and-conditions");

  return (
    <div className="p-6 flex flex-col items-center w-full">
      <div className="mb-10">
        <LogoIcon />
      </div>
      <div className="container max-w-[740px]">
        <div
          id="policy"
          data-policy-key="U25GRE9IUnFObFF6Um05dk1XYzlQUT09"
          data-extra="h-align=left&table-style=accordion"
        >
          {" "}
          Please wait while the policy is loaded. If it does not load, please{" "}
          <a
            rel="nofollow"
            href="https://app.termageddon.com/api/policy/U25GRE9IUnFObFF6Um05dk1XYzlQUT09?h-align=left&table-style=accordion"
            target="_blank"
          >
            click here
          </a>
          .{" "}
        </div>
        <script src="https://app.termageddon.com/js/termageddon.js"></script>
      </div>
    </div>
  );
}
