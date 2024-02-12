import { BottomSheet } from "@danklabs/pattern-library/core";

export function BrandDetailView({
  brandSlug,
  onClose,
}: {
  brandSlug?: string;
  onClose(): void;
}) {
  return (
    <BottomSheet open={!!(brandSlug && brandSlug.length > 0)} onClose={onClose}>
      {brandSlug}
    </BottomSheet>
  );
}
