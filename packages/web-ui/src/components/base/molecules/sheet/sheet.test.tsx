import "@testing-library/jest-dom"; // for additional matchers
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "~/components/base/atoms/button";
import { Input } from "~/components/base/atoms/input";
import { Label } from "~/components/base/atoms/label";
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

const SheetComponent = () => {
  return (
    <Sheet key={"top"}>
      <SheetTrigger asChild>
        <Button variant="default">Edit</Button>
      </SheetTrigger>
      <SheetContent side={"top"}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter className="px-6 pb-6">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

describe("SheetComponent", () => {
  test("should render Sheet component and handle open/close interactions", () => {
    render(<SheetComponent />);

    // Ensure the sheet trigger button is rendered and has the correct text
    const openDrawerButton = screen.getByRole("button", {
      name: /Edit/i,
    });
    expect(openDrawerButton).toBeInTheDocument();

    // Click the button to open the sheet
    fireEvent.click(openDrawerButton);

    // Verify the sheet content is visible
    expect(screen.getByText(/Edit profile/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Make changes to your profile here/i),
    ).toBeInTheDocument();

    // Ensure the "Save changes" button is rendered
    const saveChangesButton = screen.getByRole("button", {
      name: /Save changes/i,
    });
    expect(saveChangesButton).toBeInTheDocument();

    // Click the button to close the sheet
    fireEvent.click(saveChangesButton);

    // Verify that the sheet is no longer visible
    expect(screen.queryByText(/Edit profile/i)).not.toBeInTheDocument();
  });
});
