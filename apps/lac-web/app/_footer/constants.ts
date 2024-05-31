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
      { label: "About us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Sales Tax and Exemption", href: "/tax-form" },
      { label: "Government Customers", href: "/government" },
    ],
  },
  {
    heading: "My Account",
    links: [
      { label: "Sign in/Register", href: "/sign-in" },
      { label: "Forgot password?", href: "/forgot-password" },
      { label: "Order History", href: "/myaccount/orderhistory" },
      { label: "Shipping and Returns", href: "/myaccount/purchaseditems" },
      { label: "Wish List", href: "/myaccount/shopping-lists" },
    ],
  },
  {
    heading: "Tools and Resources",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Our Branches", href: "/branches" },
      { label: "Terms of Sale", href: "/terms-of-sale" },
      {
        label: "Terms for Suppliers",
        href: "/Terms-and-Conditions-for-WLACs-Purchase-of-Products-from-Suppliers",
      },
    ],
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
