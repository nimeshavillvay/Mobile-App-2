"use client";

import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useAddToCartForm from "../use-add-to-cart-form.hook";
import FormContent from "./form-content";

type AddToCartFormProps = {
  token: string;
  productId: number;
  minQty: number;
  incQty: number;
  uom: string;
};

const AddToCartForm = ({
  token,
  productId,
  minQty,
  incQty,
  uom,
}: AddToCartFormProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const { watch, setValue, register, handleSubmit } = useAddToCartForm();
  const quantity = watch("quantity");

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const reduceQuantity = () => {
    setValue("quantity", quantity - incQty);
  };
  const increaseQuantity = () => {
    setValue("quantity", quantity + incQty);
  };

  const addToCartMutation = useAddToCartMutation(token, {
    productId,
  });

  const onSubmit = handleSubmit(() => {
    // Update the quantity in add to cart dialog
    setQuantity(quantity);

    addToCartMutation.mutate({
      quantity,
    });
  });

  if (checkLoginQuery.data.status_code === "OK") {
    // If the user has logged in, we should do an additional check to
    // see if the product is regional locked
    return (
      <AddToCartFormLoggedIn
        token={token}
        productId={productId}
        minQty={minQty}
        incQty={incQty}
        uom={uom}
      />
    );
  }

  return (
    <FormContent
      uom={uom}
      formProps={{ onSubmit }}
      decrementButtonProps={{
        onClick: reduceQuantity,
        disabled: quantity === minQty || addToCartMutation.isPending,
      }}
      inputProps={{
        ...register("quantity", { valueAsNumber: true }),
        min: minQty,
        step: incQty,
        disabled: addToCartMutation.isPending,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled: addToCartMutation.isPending,
      }}
      submitButtonProps={{
        disabled: addToCartMutation.isPending,
      }}
    />
  );
};

export default AddToCartForm;

// A separate component for logged in users so that the
// regional restriction can be checked
const AddToCartFormLoggedIn = ({
  token,
  productId,
  minQty,
  incQty,
  uom,
}: AddToCartFormProps) => {
  const productExcludedQuery = useSuspenseProductExcluded(token, productId);

  // TODO Try to remove the duplicated code
  const { watch, setValue, register, handleSubmit } = useAddToCartForm();
  const quantity = watch("quantity");

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const reduceQuantity = () => {
    setValue("quantity", quantity - incQty);
  };
  const increaseQuantity = () => {
    setValue("quantity", quantity + incQty);
  };

  const addToCartMutation = useAddToCartMutation(token, {
    productId,
  });

  const onSubmit = handleSubmit(() => {
    // Update the quantity in add to cart dialog
    setQuantity(quantity);

    addToCartMutation.mutate({
      quantity,
    });
  });

  return (
    <FormContent
      uom={uom}
      formProps={{ onSubmit }}
      decrementButtonProps={{
        onClick: reduceQuantity,
        disabled:
          quantity === minQty ||
          addToCartMutation.isPending ||
          productExcludedQuery.data.isExcluded,
      }}
      inputProps={{
        ...register("quantity", { valueAsNumber: true }),
        min: minQty,
        step: incQty,
        disabled:
          addToCartMutation.isPending || productExcludedQuery.data.isExcluded,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled:
          addToCartMutation.isPending || productExcludedQuery.data.isExcluded,
      }}
      submitButtonProps={{
        disabled:
          addToCartMutation.isPending || productExcludedQuery.data.isExcluded,
      }}
    />
  );
};
