"use client";

import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartForm from "../use-add-to-cart-form.hook";
import FormContent from "./form-content";

type AddToCartFormProps = {
  token: string;
  productId: number;
  minQty: number;
  incQty: number;
};

const AddToCartForm = ({
  token,
  productId,
  minQty,
  incQty,
}: AddToCartFormProps) => {
  const { watch, setValue, register, handleSubmit } = useAddToCartForm();
  const quantity = watch("quantity");

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
    addToCartMutation.mutate({
      quantity,
    });
  });

  return (
    <FormContent
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
