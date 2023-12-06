import { TypeFromSelection } from "groqd";
import { brandSelection } from "../cms/queries/getBrand";

type BrandDisplayProps = TypeFromSelection<typeof brandSelection>;

export function BrandOverview(brand: BrandDisplayProps) {
  return (
    <div>
      <h1>{brand.name}</h1>
    </div>
  );
}
