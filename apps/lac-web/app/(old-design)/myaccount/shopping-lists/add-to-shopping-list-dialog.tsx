import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
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
import { LoaderCircle } from "lucide-react";
import { cookies } from "next/headers";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import useCreateShoppingListMutation from "./use-create-shopping-list-mutation.hook";
import useSuspenseShoppingList from "./use-suspense-shopping-list.hook";
import useUpdateShoppingListItemMutation from "./use-update-shopping-list-item-mutation.hook";

type AddToShoppingListDialogProps = {
  open: boolean;
  setOpenAddToShoppingListDialog: Dispatch<SetStateAction<boolean>>;
  productId: number;
  favoriteIds: string[];
};

const AddToShoppingListDialog = ({
  open,
  setOpenAddToShoppingListDialog,
  productId,
  favoriteIds,
}: AddToShoppingListDialogProps) => {
  const { toast } = useToast();

  const shoppingListsQuery = useSuspenseShoppingList("name", "desc");

  const shoppingLists = shoppingListsQuery?.data;

  const [selectedShoppingLists, setSelectedShoppingLists] = useState<string[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedShoppingLists(favoriteIds);
  }, [favoriteIds]);

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

  const onShoppingListNameSubmit = async (formData: ShoppingListNameSchema) => {
    setIsLoading(true);
    if (formData.shoppingListName !== "") {
      await createShoppingListMutation.mutateAsync(formData.shoppingListName, {
        onSuccess: (data: { list_id: string }) => {
          form.reset();
          selectedShoppingLists.push(data.list_id);
        },
      });
    }

    updateShoppingListItemMutation.mutate(
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
            onSubmit={form.handleSubmit(onShoppingListNameSubmit)}
            className="space-y-4"
          >
            <div className="grid max-h-52 grid-cols-1 overflow-y-scroll border px-3 py-1">
              {shoppingLists.lists.map((list, index) => {
                return (
                  <div
                    className={cn(
                      "flex flex-row items-center gap-2 py-2",
                      index != shoppingLists.lists.length - 1 ? "border-b" : "",
                    )}
                    key={list.listId}
                  >
                    <FormField
                      control={form.control}
                      name="shoppingListName"
                      render={() => (
                        <FormItem className="flex flex-row">
                          <Checkbox
                            id={`list-${list.listId}`}
                            checked={selectedShoppingLists.includes(
                              list.listId,
                            )}
                            onCheckedChange={(checked: boolean) => {
                              handleShoppingListCheckedChanged(
                                list.listId,
                                checked,
                              );
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
