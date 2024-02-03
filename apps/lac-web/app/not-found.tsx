import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

const NotFound = () => {
  return (
    <div className="grid size-full place-items-center">
      <div className="my-20 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          fill="none"
          className="mx-auto"
        >
          <path
            fill="#959595"
            d="M61.785 3.375h-51.57a6.752 6.752 0 00-6.75 6.75v51.66a6.752 6.752 0 006.75 6.75h51.57a6.752 6.752 0 006.75-6.75v-51.57a6.747 6.747 0 00-6.75-6.84zm-51.57 2.25h51.57a4.501 4.501 0 014.5 4.5v6.75H5.625v-6.75a4.502 4.502 0 014.59-4.5zm51.57 60.75h-51.57a4.499 4.499 0 01-4.5-4.5v-42.75h60.75v42.75a4.505 4.505 0 01-1.381 3.248 4.505 4.505 0 01-3.3 1.252z"
          />
          <path
            fill="#959595"
            d="M60.75 11.25c0 3.001-4.5 3.001-4.5 0 0-3 4.5-3 4.5 0zm-9 0c0 3.001-4.5 3.001-4.5 0 0-3 4.5-3 4.5 0zm-9 0c0 3.001-4.5 3.001-4.5 0 0-3 4.5-3 4.5 0zM40.5 32.624h-9c-.622 0-1.125.504-1.125 1.125V49.5a1.126 1.126 0 001.125 1.126h9a1.127 1.127 0 001.125-1.126V33.75a1.126 1.126 0 00-1.125-1.125zm-1.125 15.75h-6.682v-13.5h6.614l.068 13.5zm-13.883-15.75c-.621 0-1.125.504-1.125 1.125v7.47h-6.614v-7.47a1.126 1.126 0 10-2.25 0v8.596c.01.616.509 1.114 1.124 1.125h7.74v6.03a1.126 1.126 0 102.25 0V33.75a1.126 1.126 0 00-1.125-1.126zm29.88 0c-.621 0-1.125.504-1.125 1.125v7.47h-6.615v-7.47a1.126 1.126 0 10-2.25 0v8.596c.012.616.51 1.114 1.125 1.125h7.74v6.03a1.126 1.126 0 102.25 0V33.75a1.126 1.126 0 00-1.125-1.126z"
          />
        </svg>

        <h1 className="capitalize">Page not found</h1>

        <h2 className="uppercase">404 error</h2>

        <p>
          The link you clicked may be broken or the page may have been removed.
        </p>

        <Link
          href="/"
          className="bg-brand-secondary mx-auto p-2 uppercase text-white"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
