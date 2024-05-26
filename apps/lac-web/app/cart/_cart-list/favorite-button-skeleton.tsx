import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

const FavoriteButtonSkeleton = ({
  display,
}: {
  display: "mobile" | "desktop";
}) => {
  return (
    <>
      {display == "desktop" && (
        <div className="flex w-full items-center gap-2">
          <span className="text-[13px] leading-5">Add to favorite</span>
          <Skeleton className="h-4 w-4" />
        </div>
      )}

      {display === "mobile" && <Skeleton className="h-9 w-full" />}
    </>
  );
};

export default FavoriteButtonSkeleton;
