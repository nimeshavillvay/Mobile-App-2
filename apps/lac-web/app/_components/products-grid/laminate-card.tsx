import type { Product } from "@/_lib/types";
import Image from "next/image";

const LaminateCard = ({
  product,
  token,
}: {
  readonly product: Product;
  readonly token: string;
}) => {
  console.log(token);
  return (
    <div>
      <Image
        src={product.groupImage}
        alt={product.groupImage}
        width={203}
        height={203}
      />
      <h5 className="font-medium">{product.groupName}</h5>
    </div>
  );
};

export default LaminateCard;
