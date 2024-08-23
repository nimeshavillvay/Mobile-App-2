"use client";

import NumberInputField from "@/_components/number-input-field";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { MAX_QUANTITY, NOT_AVAILABLE } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import {
  calculateIncreaseQuantity,
  calculateReduceQuantity,
} from "@/_lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddToCartForm from "../../use-add-to-cart-form.hook";
import FormContent from "./form-content";

type AddToCartFormProps = {
  readonly token?: string;
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
  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemInfoQuery = useGtmProducts(
    productId ? [{ productid: productId, cartid: 0 }] : [],
  );
  const gtmItemInfo = gtmItemInfoQuery.data?.[0];

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  useEffect(() => {
    sendGTMEvent({
      event: "view_item",
      viewItemData: {
        currency: "USD",
        value: gtmItemInfo?.price,
        items: [
          {
            item_id: gtmItemInfo?.item_id,
            item_sku: gtmItemInfo?.item_sku,
            item_name: gtmItemInfo?.item_name,
            item_brand: gtmItemInfo?.item_brand,
            price: gtmItemInfo?.price,
            quantity: 1,
            item_categoryid: gtmItemInfo?.item_categoryid,
            item_primarycategory: gtmItemInfo?.item_primarycategory,
            item_category: gtmItemInfo?.item_category_path[0] ?? "",
            item_category1: gtmItemInfo?.item_category_path[1] ?? "",
            item_category2: gtmItemInfo?.item_category_path[2] ?? "",
            item_category3: gtmItemInfo?.item_category_path[3] ?? "",
          },
        ],
        page_type: getGTMPageType(
          pathnameHistory[pathnameHistory.length - 1] ?? "",
        ),
      },
      data: {
        userid: gtmUser?.userid,
        account_type: gtmUser?.account_type,
        account_industry: gtmUser?.account_industry,
        account_sales_category: gtmUser?.account_sales_category,
      },
    });
  });

  const checkLoginQuery = useSuspenseCheckLogin(token);

  const { watch, setValue, handleSubmit, control } = useAddToCartForm();
  const quantity = watch("quantity");

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const reduceQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateReduceQuantity(Number(quantity), minQty, incQty),
    );
  };
  const increaseQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateIncreaseQuantity(Number(quantity), minQty, incQty),
    );
  };

  const addToCartMutation = useAddToCartMutation({
    productId,
  });

  const onSubmit = handleSubmit((values) => {
    // Update the quantity in add to cart dialog
    setQuantity(quantity);

    addToCartMutation.mutate(values);
  });

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: minQty,
  });
  const disableAddToCartButton =
    checkAvailabilityQuery.data.status === NOT_AVAILABLE;

  if (checkLoginQuery.data?.status_code === "OK") {
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
          !quantity ||
          Number(quantity) === minQty ||
          addToCartMutation.isPending ||
          disableAddToCartButton,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled:
          quantity?.toString().length > 5 ||
          addToCartMutation.isPending ||
          disableAddToCartButton ||
          Number(quantity) + incQty >= MAX_QUANTITY,
      }}
      submitButtonProps={{
        disabled: addToCartMutation.isPending || disableAddToCartButton,
      }}
    >
      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <NumberInputField
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            ref={ref}
            name={name}
            disabled={addToCartMutation.isPending || disableAddToCartButton}
            required
            min={minQty}
            step={incQty}
            label="Quantity"
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
  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemInfoQuery = useGtmProducts(
    productId ? [{ productid: productId, cartid: 0 }] : [],
  );
  const gtmItemInfo = gtmItemInfoQuery.data?.[0];

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  useEffect(() => {
    sendGTMEvent({
      event: "view_item",
      viewItemData: {
        currency: "USD",
        value: gtmItemInfo?.price,
        items: [
          {
            item_id: gtmItemInfo?.item_id,
            item_sku: gtmItemInfo?.item_sku,
            item_name: gtmItemInfo?.item_name,
            item_brand: gtmItemInfo?.item_brand,
            price: gtmItemInfo?.price,
            quantity: 1,
            item_categoryid: gtmItemInfo?.item_categoryid,
            item_primarycategory: gtmItemInfo?.item_primarycategory,
            item_category: gtmItemInfo?.item_category_path[0] ?? "",
            item_category1: gtmItemInfo?.item_category_path[1] ?? "",
            item_category2: gtmItemInfo?.item_category_path[2] ?? "",
            item_category3: gtmItemInfo?.item_category_path[3] ?? "",
          },
        ],
        page_type: getGTMPageType(
          pathnameHistory[pathnameHistory.length - 1] ?? "",
        ),
      },
      data: {
        userid: gtmUser?.userid,
        account_type: gtmUser?.account_type,
        account_industry: gtmUser?.account_industry,
        account_sales_category: gtmUser?.account_sales_category,
      },
    });
  });

  // TODO Try to remove the duplicated code
  const { watch, setValue, handleSubmit, control } = useAddToCartForm();
  const quantity = watch("quantity");

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const reduceQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateReduceQuantity(Number(quantity), minQty, incQty),
    );
  };
  const increaseQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateIncreaseQuantity(Number(quantity), minQty, incQty),
    );
  };

  const addToCartMutation = useAddToCartMutation({
    productId,
  });

  const onSubmit = handleSubmit((values) => {
    // Update the quantity in add to cart dialog
    setQuantity(quantity);

    addToCartMutation.mutate(values);
  });

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: minQty,
  });
  const disableAddToCartButton =
    checkAvailabilityQuery.data.status === NOT_AVAILABLE;

  return (
    <FormContent
      uom={uom}
      formProps={{ onSubmit }}
      decrementButtonProps={{
        onClick: reduceQuantity,
        disabled:
          !quantity ||
          Number(quantity) === minQty ||
          addToCartMutation.isPending ||
          disableAddToCartButton,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled:
          quantity?.toString().length > 5 ||
          addToCartMutation.isPending ||
          disableAddToCartButton ||
          Number(quantity) + incQty >= MAX_QUANTITY,
      }}
      submitButtonProps={{
        disabled:
          !quantity ||
          quantity < minQty ||
          quantity % incQty !== 0 ||
          addToCartMutation.isPending ||
          disableAddToCartButton,
      }}
    >
      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <NumberInputField
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            ref={ref}
            name={name}
            disabled={addToCartMutation.isPending || disableAddToCartButton}
            required
            min={minQty}
            step={incQty}
            label="Quantity"
          />
        )}
      />
    </FormContent>
  );
};
