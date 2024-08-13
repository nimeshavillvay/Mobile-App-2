import useLaminateProductsInfo from "@/_hooks/laminate/use-suspense-laminate-info.hook";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useAddMultipleToCartMutation from "@/cart/_add-more-items/use-add-multiple-to-cart-mutation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import { Form } from "@repo/web-ui/components/ui/form";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import {
  Suspense,
  useDeferredValue,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import LaminateCardTotalPrice from "./components/laminate-card-total-price";
import LaminateItem from "./components/laminate-item";
import LaminatesDialogLoading from "./components/laminates-dialog-loading";
import {
  laminateAddToCartFormSchema,
  type LaminateAddToCartFormSchema,
} from "./helpers";

const LaminateItems = ({
  groupId,
  productIds,
  token,
  setOpen,
}: {
  readonly productIds: string[];
  readonly token: string;
  readonly groupId: string;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<LaminateAddToCartFormSchema>({
    resolver: zodResolver(laminateAddToCartFormSchema),
    defaultValues: { quantity: productIds.map(() => "") },
  });

  const laminates = useLaminateProductsInfo(productIds);
  const formId = `add-laminates-to-cart-${groupId}`;

  const quantities = form.getValues("quantity");
  const lineProductIds = form.getValues("productId");

  const delayedQuantities = useDebouncedState(quantities);
  const deferredQuantities = useDeferredValue(delayedQuantities);

  const priceCheckRequest =
    lineProductIds !== undefined
      ? lineProductIds
          .map((productId, index) => ({
            productId: Number(productId),
            qty: Number(deferredQuantities[index]),
          }))
          .filter((item) => item.qty != 0)
      : [];

  const addMultipleToCartMutation = useAddMultipleToCartMutation(token);

  const handleAddAllItemsToCart = async () => {
    const skus = form.getValues("sku");

    const addToCartRequest = productIds
      .map((productId, index) => ({
        productId: Number(productId),
        quantity: Number(quantities[index]),
        sku: skus[index] ?? "",
      }))
      .filter((item) => item.quantity !== undefined);
    addMultipleToCartMutation.mutateAsync(addToCartRequest, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  if (productIds.length === 0) {
    return "No results found";
  }

  return (
    <Form {...form}>
      <form id={formId}>
        <Suspense fallback={<LaminatesDialogLoading />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Size</TableHead>
                <TableHead>Stock/EA</TableHead>
                <TableHead className="text-center">QTY</TableHead>
                <TableHead className="text-right font-medium">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laminates.data?.map((laminate, index) => (
                <LaminateItem
                  productId={laminate.productId}
                  size={laminate.size}
                  token={token}
                  quantityFieldIndex={index}
                  formId={formId}
                  key={index}
                  sku={laminate.productSku}
                />
              ))}
            </TableBody>
          </Table>
        </Suspense>

        <div className="flex items-center gap-4 rounded bg-gray-50 p-4">
          <div className="grow">
            <Suspense fallback={<Skeleton className="h-9 w-40" />}>
              <span className="text-wurth-gray-500">Total:</span>{" "}
              {priceCheckRequest.length > 0 ? (
                <LaminateCardTotalPrice
                  token={token}
                  priceCheckRequest={priceCheckRequest}
                />
              ) : (
                <strong className="text-lg">$0.00</strong>
              )}
            </Suspense>
          </div>
          <Button
            type="button"
            onClick={handleAddAllItemsToCart}
            disabled={priceCheckRequest.length === 0}
          >
            Add to cart
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LaminateItems;
