import classNames from "classnames";

export function Drawer({
  id,
  open,
  children,
  title,
}: {
  id: string;
  open: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  const className = classNames(
    "fixed overflow-y-auto p-4 z-40 bg-white",
    // mobile uses bottom drawer
    "sm:bottom-0 sm:left-0 sm:right-0 sm:w-full sm:transition-transform sm:transform-none",
    // tablet+ uses right drawer
    "md:top-0 md:right-0 md:left-auto md:z-40 md:h-screen md:w-80 md:h-full",
    "md:transition-transform md:top-0 translate-x-full"
  );
  return (
    <div
      id={id}
      className={className}
      tabIndex={-1}
      aria-labelledby={`${id}-label`}
    >
      {/** HEADING */}
      <div className="flex flex-row gap-4 text-gray-400">
        <svg
          className="w-4 h-4 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <h5 className="grow" id={`${id}-label`}>
          {title}
        </h5>
        <button
          type="button"
          data-drawer-hide={id}
          aria-controls={id}
          className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      {/** CONTENT */}
      <div className="max-w-lg mb-6 text-sm text-gray-500 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
}
