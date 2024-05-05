import SubHeading from "@/_components/sub-heading";
import { getSaleItems } from "./apis";
import FlashSaleProduct from "./flash-sale-product";

const FlashSale = async () => {
  const saleItems = await getSaleItems();

  return (
    <section className="my-14 space-y-6 md:my-20 md:space-y-10">
      <header className="text-center">
        <SubHeading>Flash Sale</SubHeading>

        <p className="mt-2 text-base text-wurth-gray-800 md:mt-6 md:text-lg">
          Lorem ipsum dolor sit amet consectetur. Amet vitae tempus laoreet et
          sit. Venenatis maecenas scelerisque massa arcu sed.
        </p>
      </header>

      <div className="container flex w-full snap-x scroll-pl-4 flex-row gap-4 overflow-x-auto md:scroll-pl-8 md:gap-5">
        {saleItems.map((product) => (
          <FlashSaleProduct
            key={product.productId}
            product={{
              id: product.productId,
              slug: product.slug,
              title: product.productTitle,
              sku: product.productSku,
              image: product.productImage,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
