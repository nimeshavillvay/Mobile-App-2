import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
const meta: Meta<typeof Sheet> = {
  title: "Components/UI/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

export const Showcase: Story = {
  render: () => {
    return (
      <div className="ui-grid ui-grid-cols-2 ui-gap-2">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="default">{side}</Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="ui-grid ui-gap-4 ui-py-4">
                <div className="ui-grid ui-grid-cols-4 ui-items-center ui-gap-4">
                  <Label htmlFor="name" className="ui-text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="ui-col-span-3"
                  />
                </div>
                <div className="ui-grid ui-grid-cols-4 ui-items-center ui-gap-4">
                  <Label htmlFor="username" className="ui-text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="ui-col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    );
  },
};
