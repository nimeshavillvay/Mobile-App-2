"use client"; // Error components must be Client Components

import { Button } from "@repo/web-ui/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid size-full place-items-center">
      <div className="mb-32 mt-28 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="88"
          fill="none"
          viewBox="0 0 96 88"
          className="mx-auto mb-[42px]"
        >
          <path
            stroke="#BDBDBD"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M92.062 71.716L55.835 8.17a9.067 9.067 0 00-3.32-3.368A9.04 9.04 0 0040.078 8.17L3.85 71.716a9.094 9.094 0 003.368 12.432 9.04 9.04 0 004.557 1.185h72.453a9.04 9.04 0 004.525-1.22 9.092 9.092 0 003.309-12.397zM48 18.871V62.88"
          />
          <path
            stroke="#BDBDBD"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M48 74.392h.045"
          />
        </svg>

        <h1 className="font-title text-2xl font-bold capitalize leading-7 text-wurth-gray-800">
          Unexpected Error
        </h1>

        <h2 className="text-sm uppercase leading-4 text-wurth-gray-400">
          500 error
        </h2>

        <Button className="mb-6 mt-9 uppercase" onClick={reset}>
          Try again
        </Button>

        <Link
          href="/"
          className="mx-auto block max-w-fit rounded-sm bg-wurth-blue-450 p-2 px-3.5 py-2 font-extrabold uppercase text-white"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
