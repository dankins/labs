import { getPage } from "@danklabs/cake/services/admin-service";
import { RenderContent } from "@danklabs/cake/cms-content";

export default async function Page() {
  return (
    <div className="flex flex-col items-center w-full">
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
