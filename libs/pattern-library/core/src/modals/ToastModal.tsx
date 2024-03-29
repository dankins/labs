"use client";

export function ToastModal({
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
  return (
    <div
      id={id}
      tabIndex={-1}
      aria-hidden="true"
      className="hidden bg-black/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-end w-full md:inset-0 h-full max-h-full"
    >
      <div className="relative w-full max-w-md max-h-full">
        {/** MODAL CONTENT */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/** MODAL HEADER */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle={id}
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/** MODAL BODY */}
          <div className="p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
