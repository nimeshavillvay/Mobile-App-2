import { getVariants } from "../../apis";
import SKUSelect from "./sku-select";

type SKUSelectorProps = {
  groupId: string;
  sku?: string;
};

const SKUSelector = async ({ groupId, sku }: SKUSelectorProps) => {
  const variants = await getVariants(groupId, sku);

  return (
    <SKUSelect
      groupId={groupId}
      selectedSku={sku}
      variants={variants.items.map((item) => ({
        sku: item.txt_wurth_lac_item,
        name: item.SKU_attribute,
      }))}
    />
  );
};

export default SKUSelector;
