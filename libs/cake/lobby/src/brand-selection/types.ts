import type { getBrands } from "@danklabs/cake/cms";
import type { getMemberByIAM } from "@danklabs/cake/services/admin-service";

export type Cart = {
  selectionMap: { [key: string]: Brand };
  totalValue: number;
  selectionCount: number;
  loaded: boolean;
};

export type Brand = Awaited<ReturnType<typeof getBrands>>["brands"][0];
export type Pass = NonNullable<
  Awaited<ReturnType<typeof getMemberByIAM>>
>["passport"]["passes"][0];
