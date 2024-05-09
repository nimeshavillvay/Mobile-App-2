import useItemInfo from "@/_hooks/product/use-item-info.hook";

type ItemAttributesProps = {
  productId: number;
};

const ItemAttributes = ({ productId }: ItemAttributesProps) => {
  const itemAttributesQuery = useItemInfo([productId]);

  const attributes = itemAttributesQuery.data?.[0] ?? null;

  return (
    <div className="flex flex-row py-2 text-sm text-brand-gray-500">
      {attributes && (
        <>
          <div className="flex-1 flex-col">
            <Attribute label="Brand" value={attributes.brand} />
            <Attribute
              label="Box Quantity"
              value={attributes.boxQuantity.toString()}
            />
            <Attribute
              label="Manufacturer&rsquo;s Part"
              value={attributes.mfrPartNo}
            />
            <Attribute label="Weight" value={attributes.weight.toString()} />
          </div>

          <div className="flex-1 flex-col">
            {attributes.attributes?.length > 0 &&
              attributes.attributes.map((attribute) => (
                <Attribute
                  key={attribute.attribute_name}
                  label={attribute.attribute_name}
                  value={attribute.attribute_value ?? ""}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemAttributes;

const Attribute = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-row">
    <div className="flex-1 font-bold">{label}:</div>
    <div className="flex-1" dangerouslySetInnerHTML={{ __html: value }} />
  </div>
);
