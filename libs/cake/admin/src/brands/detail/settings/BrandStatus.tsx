import {
  Heading1,
  Heading3,
  SectionHeading,
} from "@danklabs/cake/pattern-library/core";
import {
  CakeBrand,
  cachedGetBrandDetail,
} from "@danklabs/cake/services/admin-service";
import {
  CancelIcon,
  CheckIcon,
  PrimaryButton,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { updateBrandStatusAction } from "../../actions";

export async function BrandStatus({ slug }: { slug: string }) {
  const brand = await cachedGetBrandDetail(slug);
  return (
    <div className="px-4 pt-2 pb-8 rounded-md shadow-md bg-white">
      <SectionHeading>Status</SectionHeading>
      {brand.db.status === "draft" && <DraftStatus brand={brand} />}
      {brand.db.status === "active" && <ActiveStatus brand={brand} />}
      {brand.db.status === "paused" && <PausedStatus brand={brand} />}
    </div>
  );
}

export function DraftStatus({
  brand,
}: {
  brand: Awaited<ReturnType<typeof cachedGetBrandDetail>>;
}) {
  return (
    <div className="flex flex-row gap-6">
      <div>
        <Heading1 className="text-xl">Draft</Heading1>
      </div>
      <div className="grow">
        <Heading3>Completion Checklist</Heading3>
        <ul>
          <ChecklistItem ready={cmsReady(brand)}>
            CMS Data Complete
          </ChecklistItem>
          <ChecklistItem ready={false}>Cake Card codes uploaded</ChecklistItem>
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <form
          action={updateBrandStatusAction.bind(
            undefined,
            brand.db.slug,
            "active"
          )}
        >
          <PrimaryButton>Set Active</PrimaryButton>
        </form>
        <SecondaryButton disabled>Deactivate</SecondaryButton>
      </div>
    </div>
  );
}

export function ActiveStatus({
  brand,
}: {
  brand: Awaited<ReturnType<typeof cachedGetBrandDetail>>;
}) {
  return (
    <div className="flex flex-row gap-6">
      <div>
        <Heading1 className="text-xl">Active</Heading1>
      </div>
      <div className="grow">Brand is live</div>
      <div className="flex flex-col gap-6">
        <form
          action={updateBrandStatusAction.bind(
            undefined,
            brand.db.slug,
            "paused"
          )}
        >
          <PrimaryButton>Pause</PrimaryButton>
        </form>
        <SecondaryButton disabled>Deactivate</SecondaryButton>
      </div>
    </div>
  );
}

export function PausedStatus({
  brand,
}: {
  brand: Awaited<ReturnType<typeof cachedGetBrandDetail>>;
}) {
  return (
    <div className="flex flex-row gap-6">
      <div>
        <Heading1 className="text-xl">Paused</Heading1>
      </div>
      <div className="grow">Brand is PAUSED</div>
      <div className="flex flex-col gap-6">
        <form
          action={updateBrandStatusAction.bind(
            undefined,
            brand.db.slug,
            "active"
          )}
        >
          <PrimaryButton>Set Active</PrimaryButton>
        </form>
        <SecondaryButton disabled>Deactivate</SecondaryButton>
      </div>
    </div>
  );
}

export function ChecklistItem({
  ready,
  children,
}: {
  ready: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      {ready ? <CheckIcon /> : <CancelIcon className="stroke-red-500" />}{" "}
      {children}
    </li>
  );
}

function cmsReady(
  brand: Awaited<ReturnType<typeof cachedGetBrandDetail>>
): boolean {
  return !!(
    brand.cms.name &&
    brand.cms.passLogo &&
    brand.cms.passBackground &&
    brand.cms.passBackgroundDesktop &&
    brand.cms.summary
  );
}
