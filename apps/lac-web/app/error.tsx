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
