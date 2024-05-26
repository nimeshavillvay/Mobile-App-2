"use client";

import useCreateShoppingListMutation from "@/(old-design)/myaccount/shopping-lists/use-create-shopping-list-mutation.hook";
import useUpdateShoppingListItemMutation from "@/(old-design)/myaccount/shopping-lists/use-update-shopping-list-item-mutation.hook";
import useSuspenseShoppingList from "@/_hooks/shopping-list/use-suspense-shopping-list.hook";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/ui/form";
import { Input } from "@repo/web-ui/components/ui/input";
import { useToast } from "@repo/web-ui/components/ui/toast";
import dayjs from "dayjs";
import { LoaderCircle } from "lucide-react";
import { Fragment, useState, type Dispatch, type SetStateAction } from "react";
import { Control, useForm } from "react-hook-form";
import * as z from "zod";

type AddToShoppingListDialogProps = {
  open: boolean;
  setOpenAddToShoppingListDialog: Dispatch<SetStateAction<boolean>>;
  productId: number;
  favoriteListIds: string[];
  token: string;
};

const AddToShoppingListDialog = ({
  open,
  setOpenAddToShoppingListDialog,
  productId,
  favoriteListIds,
  token,
}: AddToShoppingListDialogProps) => {
  const { toast } = useToast();

  const shoppingListsQuery = useSuspenseShoppingList(token, {
    sort: "name",
    sortDirection: "desc",
  });

  const shoppingLists = shoppingListsQuery?.data;

  const [selectedShoppingLists, setSelectedShoppingLists] =
    useState<string[]>(favoriteListIds);
  const [isLoading, setIsLoading] = useState(false);

  const shoppingListNameSchema = z.object({
    shoppingListName: z.string().trim(),
  });

  type ShoppingListNameSchema = z.infer<typeof shoppingListNameSchema>;

  const form = useForm<ShoppingListNameSchema>({
    resolver: zodResolver(shoppingListNameSchema),
    values: {
      shoppingListName: "",
    },
  });

  const createShoppingListMutation = useCreateShoppingListMutation();
  const updateShoppingListItemMutation = useUpdateShoppingListItemMutation();

  const createShoppingList = async (shoppingListName: string) => {
    const { list_id } = await createShoppingListMutation.mutateAsync(
      shoppingListName,
      {
        onSuccess: (data: { list_id: string }) => {
          form.reset();

          shoppingLists.lists.push({
            listId: data.list_id.toString(),
            listName: shoppingListName,
            date: dayjs().format("MM/DD/YYYY"),
            totalItem: "1",
          });
        },
      },
    );

    return list_id;
  };

  const updateShoppingList = async (
    productId: number,
    selectedShoppingLists: string[],
  ) => {
    return updateShoppingListItemMutation.mutate(
      {
        listIds: selectedShoppingLists.map((shoppingListId) =>
          parseInt(shoppingListId),
        ),
        productId: productId,
      },
      {
        onSuccess: () => {
          toast({
            title: "Product has added to the list successfully",
          });
          setOpenAddToShoppingListDialog(false);
          setIsLoading(false);
        },
      },
    );
  };

  const handleShoppingListNameSubmit = async (
    formData: ShoppingListNameSchema,
  ) => {
    setIsLoading(true);

    const updatedShoppingLists = selectedShoppingLists;

    if (formData.shoppingListName !== "") {
      const newShoppingListId = await createShoppingList(
        formData.shoppingListName,
      );

      updatedShoppingLists.push(newShoppingListId.toString());
    }

    updateShoppingList(productId, updatedShoppingLists);
  };

  const handleShoppingListCheckedChanged = (
    listId: string,
    checked: boolean,
  ) => {
    const updatedShoppingLists = checked
      ? [...selectedShoppingLists, listId]
      : selectedShoppingLists.filter((id) => id !== listId);
    setSelectedShoppingLists(updatedShoppingLists);
  };

  return (
    <Dialog open={open} onOpenChange={setOpenAddToShoppingListDialog}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add to Shopping List</DialogTitle>
          <div>Select Shopping List or Type the New One</div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleShoppingListNameSubmit)}
            className="space-y-4"
          >
            <div className="grid max-h-52 grid-cols-1 overflow-y-scroll border px-3 py-1">
              {shoppingLists.lists.map((list, index) => {
                return (
                  <Fragment key={list.listId}>
                    <ShoppingListItem
                      index={index}
                      shoppingLists={shoppingLists.lists}
                      list={list}
                      formControl={form.control}
                      selectedShoppingLists={selectedShoppingLists}
                      handleShoppingListCheckedChanged={
                        handleShoppingListCheckedChanged
                      }
                    />
                  </Fragment>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="shoppingListName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter New Shopping List Name Here"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      Enter New Shopping List Name Here
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-right">
              <Button
                type="submit"
                className="h-9 w-[90px] rounded-[3px] bg-brand-primary px-4 text-base font-normal uppercase text-white"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "UPDATE"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToShoppingListDialog;

const ShoppingListItem = ({
  index,
  shoppingLists,
  list,
  formControl,
  selectedShoppingLists,
  handleShoppingListCheckedChanged,
}: {
  index: number;
  shoppingLists: {
    listId: string;
    listName: string;
    date: string;
    totalItem: string;
  }[];
  list: {
    listId: string;
    listName: string;
  };
  formControl: Control<{ shoppingListName: string }>;
  selectedShoppingLists: string[];
  handleShoppingListCheckedChanged: (listId: string, checked: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-2 py-2",
        index != shoppingLists.length - 1 ? "border-b" : "",
      )}
    >
      <FormField
        control={formControl}
        name="shoppingListName"
        render={() => (
          <FormItem className="flex flex-row">
            <Checkbox
              id={`list-${list.listId}`}
              checked={selectedShoppingLists.includes(list.listId)}
              onCheckedChange={(checked: boolean) => {
                handleShoppingListCheckedChanged(list.listId, checked);
              }}
            />
            <FormLabel
              htmlFor={`list-${list.listId}`}
              className="cursor-pointer"
            >
              {list.listName}
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
};