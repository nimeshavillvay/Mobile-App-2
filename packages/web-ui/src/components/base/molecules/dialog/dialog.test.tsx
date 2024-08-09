import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "~/components/base/atoms/button";
import { Input } from "~/components/base/atoms/input";
import { Label } from "~/components/base/atoms/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

describe("Dialog Component", () => {
  const renderDialog = () => {
    return render(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="subtle">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent style={{ maxWidth: 425 }}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Label htmlFor="name" style={{ textAlign: "right" }}>
                Name
              </Label>
              <Input id="name" style={{ gridColumn: "span 3 / span 3" }} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Label htmlFor="username" style={{ textAlign: "right" }}>
                Username
              </Label>
              <Input id="username" style={{ gridColumn: "span 3 / span 3" }} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );
  };

  it("renders correctly and shows dialog on button click", () => {
    renderDialog();

    // Assert that the trigger button is in the document
    const triggerButton = screen.getByRole("button", { name: /edit profile/i });
    expect(triggerButton).toBeInTheDocument();

    // Click the button to open the dialog
    fireEvent.click(triggerButton);

    // Assert that the dialog content is in the document
    const dialogTitle = screen.getByRole("heading", { name: /edit profile/i });
    const dialogDescription = screen.getByText(
      /make changes to your profile here/i,
    );
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogDescription).toBeInTheDocument();

    // Assert that the Save changes button is in the document
    const saveButton = screen.getByRole("button", { name: /save changes/i });
    expect(saveButton).toBeInTheDocument();
  });

  it("closes the dialog when the close button (X) is clicked", () => {
    renderDialog();

    // Click the button to open the dialog
    const triggerButton = screen.getByRole("button", { name: /edit profile/i });
    fireEvent.click(triggerButton);

    // Assert that the dialog content is in the document
    expect(
      screen.getByRole("heading", { name: /edit profile/i }),
    ).toBeInTheDocument();

    const closeButton = screen.getByTestId("close");
    expect(closeButton).toBeInTheDocument();

    // Click the close button
    fireEvent.click(closeButton);

    // Assert that the dialog content is no longer in the document
    expect(
      screen.queryByRole("heading", { name: /edit profile/i }),
    ).not.toBeInTheDocument();
  });
});
