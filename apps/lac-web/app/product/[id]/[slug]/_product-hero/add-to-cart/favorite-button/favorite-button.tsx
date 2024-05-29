"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import FavoriteButtonForLoggedIn from "./favorite-button-for-logged-in";
import FavoriteButtonSkeleton from "./favorite-button-skeleton";

type FavoriteButtonProps = {
  readonly token: string;
  readonly productId: number;
};

const FavoriteButton = ({ token, productId }: FavoriteButtonProps) => {
  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isLoggedInUser = checkLoginQuery.data.status_code === "OK";

  return isLoggedInUser ? (
    <Suspense fallback={<FavoriteButtonSkeleton />}>
      <FavoriteButtonForLoggedIn productId={productId} token={token} />
    </Suspense>
  ) : (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        router.push("/sign-in");
      }}
    >
      <HeartOutline className="size-4" />

      <span className="sr-only">Add to favorites</span>
    </Button>
  );
};

export default FavoriteButton;
