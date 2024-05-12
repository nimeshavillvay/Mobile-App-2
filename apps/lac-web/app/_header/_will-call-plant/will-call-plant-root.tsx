import { getPlants } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Shop } from "@repo/web-ui/components/icons/shop";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense, type ComponentProps } from "react";
import WillCallPlant from "./will-call-plant";

const WillCallPlantMain = (
  props: Omit<ComponentProps<typeof WillCallPlant>, "token">,
) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return (
    <div className="flex flex-row items-center gap-2 text-black">
      <Shop width={16} height={16} />

      <WillCallPlant token={sessionCookie.value} {...props} />
    </div>
  );
};

const WillCallPlantRoot = async (
  props: Omit<ComponentProps<typeof WillCallPlantMain>, "plants">,
) => {
  const plants = await getPlants();

  return (
    <Suspense fallback={<Skeleton className="h-5 w-20" />}>
      <WillCallPlantMain plants={plants} {...props} />
    </Suspense>
  );
};

export default WillCallPlantRoot;
