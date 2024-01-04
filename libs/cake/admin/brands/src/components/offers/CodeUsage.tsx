import { getOfferCodeUsage } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";

export function CodeUsage({ templateId }: { templateId: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component templateId={templateId} />
    </Suspense>
  );
}

function Loading() {
  return <div>Codes Used: - / -</div>;
}

async function Component({ templateId }: { templateId: string }) {
  const data = await getOfferCodeUsage(templateId);
  const display = `${data.used} / ${data.total}`;
  return <div>Codes Used: {display}</div>;
}
