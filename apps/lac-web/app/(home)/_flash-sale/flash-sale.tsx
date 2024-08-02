import ProductCard from "@/_components/product-card";
import ProductCardSkeleton from "@/_components/product-card-skeleton";
import SubHeading from "@/_components/sub-heading";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import {
  ScrollableContainer,
  ScrollableNextButton,
  ScrollablePreviousButton,
  ScrollableRoot,
} from "@repo/web-ui/components/scrollable";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { getSaleItems } from "./apis";

const FlashSaleList = async () => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  const saleItems = await getSaleItems();

  if (!sessionToken?.value) {
    return null;
  }

  return saleItems.map((product) => (
    <Suspense key={product.productId} fallback={<ProductCardSkeleton />}>
      <ProductCard
        orientation="vertical"
        token={sessionToken.value}
        product={{
          groupName: product.productTitle,
          groupImage: product.productImage,
          variants: [
            {
              id: product.productId,
              slug: product.slug,
              sku: product.productSku,
              title: product.productTitle,
              image: product.productImage,
              uom: product.unitOfMeasure,
              isNewItem: product.isNewItem,
            },
          ],
        }}
      />
    </Suspense>
  ));
};

const FlashSale = () => {
  return (
    <section className="my-14 space-y-6 md:my-20 md:space-y-10">
      <header className="text-center">
        <SubHeading>
          Today&apos;s Specials: Unbeatable Deals on Woodworking and Shop
          Supplies
        </SubHeading>

        <p className="container mt-2 text-base text-wurth-gray-800 md:mt-6 md:text-lg">
          Discover Today&apos;s Specials at Würth Louis and Company, featuring
          exclusive deals on high-quality woodworking and shop supplies. Whether
          you&apos;re a professional woodworker, a business owner, or a
          dedicated hobbyist, our daily specials provide exceptional savings on
          top brands. Don&apos;t miss out on these limited time offers to stock
          up on essential tools and materials while quantities last. Shop now
          and enjoy the exceptional value and quality that only Würth Louis and
          Company can deliver.
        </p>
      </header>

      <ScrollableRoot className="container">
        <ScrollablePreviousButton />

        <ScrollableContainer className="w-full snap-x scroll-pl-4 items-stretch gap-4 md:scroll-pl-8 md:gap-5">
          <Suspense
            fallback={Array.from({ length: 7 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          >
            <FlashSaleList />
          </Suspense>
        </ScrollableContainer>

        <ScrollableNextButton />
      </ScrollableRoot>
    </section>
  );
};

export default FlashSale;
