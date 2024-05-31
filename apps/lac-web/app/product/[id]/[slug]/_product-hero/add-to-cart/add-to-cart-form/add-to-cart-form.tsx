"use client";

import QuantityInputField from "@/_components/quantity-input-field";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Controller } from "react-hook-form";
import useAddToCartForm from "../../use-add-to-cart-form.hook";
import FormContent from "./form-content";

type AddToCartFormProps = {
  readonly token: string;
  readonly productId: number;
  readonly minQty: number;
  readonly incQty: number;
  readonly uom: string;
};

const AddToCartForm = ({
  token,
  productId,
  minQty,
  incQty,
  uom,
}: AddToCartFormProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const { watch, setValue, handleSubmit, control } = useAddToCartForm();
  const quantity = watch("quantity");

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const reduceQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue("quantity", Number(quantity) - incQty);
  };
  const increaseQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue("quantity", Number(quantity) + incQty);
  };

  const addToCartMutation = useAddToCartMutation(token, {
    productId,
  });

  const onSubmit = handleSubmit((values) => {
    // Update the quantity in add to cart dialog
    setQuantity(quantity);

    addToCartMutation.mutate(values);
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
        disabled:
          !quantity || quantity === minQty || addToCartMutation.isPending,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled:
          quantity?.toString().length >= 5 || addToCartMutation.isPending,
      }}
      submitButtonProps={{
        disabled: addToCartMutation.isPending,
      }}
    >
      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <QuantityInputField
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            ref={ref}
            name={name}
            disabled={addToCartMutation.isPending}
            required
            min={minQty}
            step={incQty}
          />
        )}
      />
    </FormContent>
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
  // TODO Try to remove the duplicated code
  const { watch, setValue, handleSubmit, control } = useAddToCartForm();
  const quantity = watch("quantity");

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const reduceQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue("quantity", Number(quantity) - incQty);
  };
  const increaseQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue("quantity", Number(quantity) + incQty);
  };

  const addToCartMutation = useAddToCartMutation(token, {
    productId,
  });

  const onSubmit = handleSubmit((values) => {
    // Update the quantity in add to cart dialog
    setQuantity(quantity);

    addToCartMutation.mutate(values);
  });

  return (
    <FormContent
      uom={uom}
      formProps={{ onSubmit }}
      decrementButtonProps={{
        onClick: reduceQuantity,
        disabled:
          !quantity || quantity === minQty || addToCartMutation.isPending,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled:
          quantity?.toString().length >= 5 || addToCartMutation.isPending,
      }}
      submitButtonProps={{
        disabled: addToCartMutation.isPending,
      }}
    >
      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <QuantityInputField
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            ref={ref}
            name={name}
            disabled={addToCartMutation.isPending}
            required
            min={minQty}
            step={incQty}
          />
        )}
      />
    </FormContent>
  );
};
