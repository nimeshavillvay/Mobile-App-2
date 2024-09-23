"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { BookmarkOutline } from "@repo/web-ui/components/icons/bookmark-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import FavoriteButtonForLoggedIn from "./favorite-button-for-logged-in";
import FavoriteButtonSkeleton from "./favorite-button-skeleton";

type FavoriteButtonProps = {
  readonly token: string;
  readonly productId: number;
  readonly display: "mobile" | "desktop";
};

const FavoriteButton = ({ token, productId, display }: FavoriteButtonProps) => {
  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isLoggedInUser = checkLoginQuery.data.status_code === "OK";

  return (
    <>
      {display === "desktop" &&
        (isLoggedInUser ? (
          <Suspense fallback={<FavoriteButtonSkeleton display="desktop" />}>
            <FavoriteButtonForLoggedIn
              display="desktop"
              productId={productId}
              token={token}
            />
          </Suspense>
        ) : (
          <Button
            variant="ghost"
            className="h-fit w-full justify-end px-0 py-0"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            <span className="text-[13px] leading-5">Add to List</span>
            <BookmarkOutline className="size-4" />
          </Button>
        ))}

      {display === "mobile" &&
        (isLoggedInUser ? (
          <Suspense fallback={<FavoriteButtonSkeleton display="mobile" />}>
            <FavoriteButtonForLoggedIn
              display="mobile"
              productId={productId}
              token={token}
            />
          </Suspense>
        ) : (
          <Button
            variant="subtle"
            className="w-full"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            <BookmarkOutline className="size-4" />
            <span className="sr-only">Add to list</span>
          </Button>
        ))}
    </>
  );
};

export default FavoriteButton;
