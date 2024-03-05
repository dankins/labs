import { WalletIcon } from "@danklabs/cake/pattern-library/core";
import classNames from "classnames";
import Link from "next/link";
import { IconBaseProps } from "react-icons/lib";

export function Tabs({ slug }: { slug: string }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <TabItem
          icon={WalletIcon}
          title="Dashboard"
          href={`/admin/brands/${slug}`}
        />
        <TabItem
          icon={WalletIcon}
          title="Members"
          href={`/admin/brands/${slug}`}
        />
        <TabItem
          icon={WalletIcon}
          title="Settings"
          href={`/admin/brands/${slug}`}
        />

        {/* <li>
          <Link
            href="#"
            className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500"
          >
            Disabled
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export function TabItem({
  title,
  href,
  icon: Icon,
}: {
  title: string;
  href: string;
  icon: React.FC<IconBaseProps>;
}) {
  const active = false;

  return (
    <li className="me-2">
      <Link
        href={href}
        className={classNames(
          "inline-flex items-center justify-center p-4 border-b-2 group",
          active
            ? "text-blue-600 border-blue-600 rounded-t-lg hover:text-gray-600"
            : "border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
        )}
        aria-current="page"
      >
        <Icon
          className={classNames(
            "mr-1",
            active ? "text-blue-600" : "text-gray-600 group-hover:text-gray-600"
          )}
        />
        {title}
      </Link>
    </li>
  );
}
