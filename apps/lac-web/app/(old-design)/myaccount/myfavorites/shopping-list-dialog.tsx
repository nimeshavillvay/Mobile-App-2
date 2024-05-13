import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { ShoppingListElement } from "./type";
import useCreateShoppingList from "./use-create-shopping-list.hook";
import useUpdateShoppingList from "./use-update-shopping-list-hook";

type ShoppingListDialogProps = {
  open: boolean;
  setOpenShoppingListDialog: Dispatch<SetStateAction<boolean>>;
  isShoppingListNameUpdate: boolean;
  shoppingList: ShoppingListElement;
};

const ShoppingListDialog = ({
  open,
  setOpenShoppingListDialog,
  isShoppingListNameUpdate,
  shoppingList,
}: ShoppingListDialogProps) => {
  const shoppingListNameSchema = z.object({
    shoppingListName: z
      .string()
      .trim()
      .min(1, "Please enter a name for the shopping list"),
  });

  type ShoppingListNameSchema = z.infer<typeof shoppingListNameSchema>;

  const form = useForm<ShoppingListNameSchema>({
    resolver: zodResolver(shoppingListNameSchema),
    values: {
      shoppingListName: shoppingList.listName,
    },
  });

  const createShoppingListMutation = useCreateShoppingList();
  const updateShoppingListMutation = useUpdateShoppingList();

  const onShoppingListNameSubmit = (formData: ShoppingListNameSchema) => {
    if (isShoppingListNameUpdate) {
      updateShoppingListMutation.mutate(
        { listId: shoppingList.listId, listName: formData.shoppingListName },
        {
          onSuccess: () => {
            setOpenShoppingListDialog(false);
            form.reset();
          },
        },
      );
    } else {
      createShoppingListMutation.mutate(formData.shoppingListName, {
        onSuccess: () => {
          setOpenShoppingListDialog(false);
          form.reset();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpenShoppingListDialog}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Shopping List</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onShoppingListNameSubmit)}
            className="space-y-4 p-5"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="shoppingListName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Shopping List Name
                    </FormLabel>
                    <FormDescription className="sr-only">
                      Shopping List Name
                    </FormDescription>

                    <FormControl>
                      <Input
                        placeholder="Shopping List Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Shopping List Name
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="h-9 rounded-[3px] bg-brand-primary px-4 text-base font-normal uppercase text-white"
              >
                Done
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingListDialog;
