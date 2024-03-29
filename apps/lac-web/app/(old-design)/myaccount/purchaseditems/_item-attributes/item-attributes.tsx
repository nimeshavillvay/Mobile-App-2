import type { ItemAttributes } from "./types";
import useSuspenseItemAttributes from "./use-suspense-item-attributes.hook";

type ItemAttributesProps = {
  token: string;
  sku: string;
};

const ItemAttributes = ({ token, sku }: ItemAttributesProps) => {
  const itemAttributesQuery = useSuspenseItemAttributes(token, sku);

  const attributes = itemAttributesQuery.data ?? null;

  return (
    <div className="flex flex-row py-2 text-sm text-brand-gray-500">
      {attributes && (
        <>
          <div className="flex-1 flex-col">
            <Attribute label="Brand" value={attributes.brand} />
            <Attribute label="Box Quantity" value={attributes.box_quantity} />
            <Attribute
              label="Manufacturer&rsquo;s Part"
              value={attributes.manufacturer_part}
            />
            <Attribute label="Weight" value={attributes.weight} />
          </div>

          <div className="flex-1 flex-col">
            {attributes.attributes?.length > 0 &&
              attributes.attributes.map((attribute) => (
                <Attribute
                  key={attribute.attribute_name}
                  label={attribute.attribute_name}
                  value={attribute.attribute_value}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemAttributes;

const Attribute = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-row">
    <div className="flex-1 font-bold">{label}:</div>
    <div className="flex-1" dangerouslySetInnerHTML={{ __html: value }} />
  </div>
);
