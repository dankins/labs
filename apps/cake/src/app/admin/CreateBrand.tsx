import { Button } from "@danklabs/pattern-library/core";

export function CreateBrand({
  createBrandAction,
}: {
  createBrandAction(formData: FormData): Promise<void>;
}) {
  return (
    <div>
      <h1>Create Brand</h1>
      <form action={createBrandAction}>
        <input type="text" name="email" />
        <Button>Submit</Button>
      </form>
    </div>
  );
}
