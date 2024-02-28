import { getPage } from "@danklabs/cake/cms";
import { RenderContent } from "@danklabs/cake/cms-content";

export default async function Page() {
  return <div>stub</div>;
}

// export default async function Page() {
//   const page = await getPage("terms-and-conditions");

//   return (
//     <div className="flex flex-row justify-center w-full">
//       <div className="prose-dark">
//         <RenderContent blocks={page.content} />
//       </div>
//     </div>
//   );
// }
