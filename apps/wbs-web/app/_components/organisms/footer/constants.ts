import { Headset } from "@repo/web-ui/components/icons/headset";
import { PackageDelivery } from "@repo/web-ui/components/icons/package-delivery";
import { TruckWithClock } from "@repo/web-ui/components/icons/truck-with-clock";
import { Wallet } from "@repo/web-ui/components/icons/wallet";

export const REASONS = [
  {
    title: 'Buy "your way"',
    description:
      "Order by 24/7 by web, contact our sales reps or call by phone.",
    Icon: TruckWithClock,
  },
  {
    title: "One stop shop",
    description: "What you need, when you need it, all in one place.",
    Icon: Wallet,
  },
  {
    title: "Next day delivery",
    description: "Orders are shipped next day.",
    Icon: PackageDelivery,
  },
  {
    title: "Expert support team",
    description: "Advice and support from knowledgeable professionals.",
    Icon: Headset,
  },
] as const;
