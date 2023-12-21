"use client";
import { Button } from "@danklabs/pattern-library/core";
import { useQueryStringUpdater } from "../util/searchParams";

export function Welcome() {
  const updateQueryString = useQueryStringUpdater();
  return (
    <div>
      <div>welcome</div>
      <div>
        <Button onClick={() => updateQueryString("step", "brand_selection")}>
          Continue
        </Button>
      </div>
    </div>
  );
}
