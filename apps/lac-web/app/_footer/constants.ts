import { Facebook } from "@repo/web-ui/components/icons/facebook";
import { Headset } from "@repo/web-ui/components/icons/headset";
import { Instagram } from "@repo/web-ui/components/icons/instagram";
import { LinkedIn } from "@repo/web-ui/components/icons/linkedin";
import { PackageDelivery } from "@repo/web-ui/components/icons/package-delivery";
import { Pinterest } from "@repo/web-ui/components/icons/pinterest";
import { TikTok } from "@repo/web-ui/components/icons/tiktok";
import { TruckWithClock } from "@repo/web-ui/components/icons/truck-with-clock";
import { Twitter } from "@repo/web-ui/components/icons/twitter";
import { Wallet } from "@repo/web-ui/components/icons/wallet";
import { YouTube } from "@repo/web-ui/components/icons/youtube";

export const REASONS = [
  {
    title: "Same-day Delivery",
    description: "Order before Noon and enjoy Same-Day Delivery on your order!",
    Icon: TruckWithClock,
  },
  {
    title: "Lowest Price guarantee",
    description: "Order before Noon and enjoy Same-Day Delivery on your order!",
    Icon: Wallet,
  },
  {
    title: "50+ Pick Up Locations",
    description: "Order before Noon and enjoy Same-Day Delivery on your order!",
    Icon: PackageDelivery,
  },
  {
    title: "Expert Support Team",
    description: "Order before Noon and enjoy Same-Day Delivery on your order!",
    Icon: Headset,
  },
] as const;

export const SECTIONS = [
  {
    heading: "Company Information",
    links: [
      "About us",
      "Careers",
      "Sales Tax and Exemption",
      "Government Customers",
    ],
  },
  {
    heading: "My Account",
    links: [
      "Sign in/Register",
      "Forgot password?",
      "Order History",
      "Shipping and Returns",
      "Wish List",
    ],
  },
  {
    heading: "Tools and Resources",
    links: ["FAQs", "Our Branches", "Terms of Sale", "Terms for Suppliers"],
  },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    Icon: Facebook,
  },
  {
    name: "Instagram",
    Icon: Instagram,
  },
  {
    name: "LinkedIn",
    Icon: LinkedIn,
  },
  {
    name: "Twitter",
    Icon: Twitter,
  },
  {
    name: "Pinterest",
    Icon: Pinterest,
  },
  {
    name: "YouTube",
    Icon: YouTube,
  },
  {
    name: "TikTok",
    Icon: TikTok,
  },
] as const;
