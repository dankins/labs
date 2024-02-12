"use client";

import { useState } from "react";
import { BrandDetailView } from "./BrandDetailView";

function getBrand(element: Element): string | undefined {
  const maybeBrand = element.getAttribute("x-data-brand");
  if (maybeBrand) {
    return maybeBrand;
  }
  return element.parentElement ? getBrand(element.parentElement) : undefined;
}

export function GridItemWrapper({ children }: { children: React.ReactNode }) {
  const [activeBrand, setActiveBrand] = useState<string | undefined>();
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target instanceof Element) {
      const maybeBrand = getBrand(e.target);
      console.log("setActiveBrand", maybeBrand);
      setActiveBrand(maybeBrand);
    }
  }
  return (
    <div onClick={handleClick}>
      {children}
      <BrandDetailView
        brandSlug={activeBrand}
        onClose={() => setActiveBrand(undefined)}
      />
    </div>
  );
}
