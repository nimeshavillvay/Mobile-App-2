import Separator from "@/_components/separator";
import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import { getProduct } from "../../apis";
import AddItemForm from "./add-item-form";
import AddItemFormProvider from "./add-item-form-provider";
import ImageCarousel from "./image-carousel";
import SKUSelector from "./sku-selector";

type ProductHeroProps = {
  groupId: string;
  sku?: string;
};

const ProductHero = async ({ groupId, sku }: ProductHeroProps) => {
  const product = await getProduct(groupId, sku);

  const parsedMinOrder = parseInt(
    product.selected_item?.txt_min_order_amount ?? "1",
  );
  const minOrder = !isNaN(parsedMinOrder) ? parsedMinOrder : 1;
  const parsedQtyIncrements = parseInt(
    product.selected_item?.txt_order_qty_increments ?? "1",
  );
  const qtyIncrements = !isNaN(parsedQtyIncrements) ? parsedQtyIncrements : 1;

  return (
    <AddItemFormProvider minOrder={minOrder} qtyIncrements={qtyIncrements}>
      <div className="mb-3.5 mt-[50px]">
        <h1 className="text-2xl font-bold leading-7 text-[#333333]">
          {product.page_title}
        </h1>

        <div className="mt-11 flex flex-row items-start gap-8">
          <ImageCarousel
            productImages={product.group_img}
            productTitle={product.page_title}
          />

          <div className="flex-1">
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

            {!!product?.selected_item && (
              <>
                <div className="text-brand-gray-400 mt-2 leading-[17px]">
                  Manufacturer Part # :{" "}
                  {product.selected_item?.txt_wurth_lac_item}
                </div>

                <AddItemForm product={product} />
              </>
            )}
          </div>

          <div className="w-[322px]"></div>
        </div>

        <Separator
          orientation="horizontal"
          className="bg-brand-gray-200 mb-3 mt-8 h-px w-full"
        />
      </div>
    </AddItemFormProvider>
  );
};

export default ProductHero;
