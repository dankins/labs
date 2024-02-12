"use client";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export function updateQueryString(
  searchParams: ReadonlyURLSearchParams,
  param: string,
  value: string,
  mode: "replace" | "append" | "remove" = "replace"
) {
  // now you got a read/write object
  const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

  // update as necessary
  if (mode === "append") {
    const currentValue = current.get(param);
    current.set(
      param,
      currentValue?.length === 0 || currentValue === null
        ? value
        : `${currentValue},${value}`
    );
  } else if (mode === "remove") {
    const currentValue = current.get(param);
    const currentValueArr = currentValue?.split(",");
    const removeIdx = currentValueArr?.indexOf(value);

    if (currentValueArr && typeof removeIdx !== "undefined" && removeIdx > -1) {
      currentValueArr.splice(removeIdx, 1);
      current.set(param, currentValueArr?.join(","));
    }
  } else {
    current.set(param, value);
  }

  // cast to string
  const search = current.toString();
  // or const query = `${'?'.repeat(search.length && 1)}${search}`;
  return search ? `?${search}` : "";
}

export function useQueryStringUpdater() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    param: string,
    value: string,
    mode: "replace" | "append" | "remove" = "replace"
  ) => {
    const query = updateQueryString(searchParams, param, value, mode);
    router.push(`${pathname}${query}`);
  };
}
