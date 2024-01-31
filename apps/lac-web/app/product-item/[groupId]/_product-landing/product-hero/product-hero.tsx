import Separator from "@/_components/separator";
import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import { getProduct } from "../../apis";
import ImageCarousel from "./image-carousel";
import SKUSelector from "./sku-selector";

type ProductHeroProps = {
  groupId: string;
  sku?: string;
};

const ProductHero = async ({ groupId, sku }: ProductHeroProps) => {
  const product = await getProduct(groupId, sku);

  return (
    <div className="max-w-desktop mx-auto">
      <h1>{product.page_title}</h1>

      <div className="flex flex-row gap-[30px]">
        <ImageCarousel
          productImages={product.group_img}
          productTitle={product.page_title}
        />

        <div>
          {!!product.selected_item && (
            <Image
              src={getMediaUrl(product.selected_item.item_brand_logo)}
              alt={`The logo of ${product.selected_item.item_brand_name}`}
              width={63}
              height={63}
              className="h-[63px] w-[63px] object-contain"
            />
          )}

          <SKUSelector groupId={groupId} sku={sku} />

          {!!sku && (
            <>
              <div className="text-brand-dark-gray">
                Manufacturer Part # :{" "}
                {product.selected_item?.txt_wurth_lac_item}
              </div>

              <div>Quantity :</div>

              <div className="flex flex-row items-center gap-2">
                <span>
                  Min Order : {product.selected_item?.txt_min_order_amount}
                </span>

                <Separator
                  orientation="vertical"
                  className="bg-brand-very-dark-gray h-6 w-px"
                />

                <span>
                  Quantity Multiple :{" "}
                  {product.selected_item?.txt_order_qty_increments}
                </span>
              </div>

              <button className="bg-brand-primary p-2 uppercase text-white">
                Login to view price and buy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
