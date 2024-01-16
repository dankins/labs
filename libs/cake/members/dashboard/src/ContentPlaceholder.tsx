import { faker } from "@faker-js/faker";
import classNames from "classnames";

export function ContentPlaceholder() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <ContentItem
        title={faker.lorem.lines(1)}
        excerpt={faker.lorem.lines(2)}
      />
      <ContentItem
        title={faker.lorem.lines(1)}
        excerpt={faker.lorem.lines(2)}
      />
      <ContentItem
        title={faker.lorem.lines(1)}
        excerpt={faker.lorem.lines(2)}
        featured
      />
      <ContentItem
        title={faker.lorem.lines(1)}
        excerpt={faker.lorem.lines(2)}
      />
    </div>
  );
}

function ContentItem({
  title,
  excerpt,
  featured,
}: {
  title: string;
  excerpt: string;
  featured?: boolean;
}) {
  return (
    <div
      className={classNames(
        "border rounded aspect-video flex flex-col",
        featured && "col-span-2"
      )}
    >
      <div
        className={classNames("bg-slate-300 grow", featured ? "h-16" : "h-32")}
      ></div>
      <div className="p-3">
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="text-sm">{excerpt}</p>
      </div>
    </div>
  );
}
