import { Centered, PageContent } from "@danklabs/pattern-library/core";
import { CreateBrand } from "./CreateBrand";
import { createBrandAction } from "./actions";
import Link from "next/link";

export default function Page() {
  return (
    <PageContent>
      <Centered>
        <h1>Welcome to the admin dashboard</h1>

        <div>
          <ul>
            <li>
              <Link href="/admin/brands">Brands</Link>
            </li>
          </ul>
        </div>
      </Centered>
    </PageContent>
  );
}
