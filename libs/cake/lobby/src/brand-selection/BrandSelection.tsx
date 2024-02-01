import { Container } from "./Container";
import { getBrands } from "../queries/getBrands";
import { Suspense } from "react";
import { GridList } from "./BrandGrid";

const MAX_SELECTIONS = 2;

export function BrandSelection({ selection }: { selection: string[] }) {
  return (
    <Suspense fallback={<Loading />}>
      <Loaded selection={selection} />
    </Suspense>
  );
}

export function Loading() {
  return (
    <Container>
      <h1>Lobby Brands</h1>
      <div>loading</div>
    </Container>
  );
}

async function Loaded({ selection }: { selection: string[] }) {
  const result = await getBrands();
  return (
    <div className="w-full container">
      <GridList />
      {/* <h1>Lobby Brands</h1>
      <div className="grid grid-cols-3 gap-3 m-5">
        {result.brands.map((b) => (
          <BrandCard
            key={b.slug}
            brand={b}
            selected={selection.includes(b.slug)}
            selection={selection}
            selectable={
              selection.length < MAX_SELECTIONS || selection.includes(b.slug)
            }
          />
        ))}
      </div>
      <ContinueButton selection={selection} /> */}
    </div>
  );
}
