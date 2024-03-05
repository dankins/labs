import { ContentListSelection } from "@danklabs/cake/cms";
import { SanityImage } from "@danklabs/cake/pattern-library/core";
import classNames from "classnames";
import Link from "next/link";

export type ContentGridProps = {
  contentList: ContentListSelection[];
};

export function ContentGrid({ contentList }: ContentGridProps) {
  return (
    <div className="grid justify-items-stretch grid-cols-2 md:grid-cols-3 gap-2">
      {contentList.map((content) => (
        <ContentItem content={content} />
      ))}
    </div>
  );
}

function ContentItem({ content }: { content: ContentListSelection }) {
  return (
    <Link href={`/stories/${content.slug}`}>
      <div
        className={classNames(
          "border rounded flex flex-col aspect-wallet",
          content.featured && "col-span-2"
        )}
      >
        <div className={classNames("bg-slate-300 grow")}>
          <SanityImage
            image={content.image}
            alt={`Headline image for article ${content.title}`}
            height={0}
            width={0}
            style={{ height: "100%", width: "100%" }}
            aspectRatio="portrait"
          />
        </div>
        <div className="h-32 overflow-y-hidden p-3 mb-5">
          <h1 className="font-bold text-lg">{content.title}</h1>

          <p>{content.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
