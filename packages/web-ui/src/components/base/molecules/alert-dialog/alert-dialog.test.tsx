import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "~/components/base/atoms/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

describe("AlertDialog Component", () => {
  const renderAlertDialog = () => {
    return render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
  };

  it("renders correctly and shows dialog on button click", () => {
    renderAlertDialog();

    // Assert that the button is in the document
    const triggerButton = screen.getByRole("button", { name: /show dialog/i });
    expect(triggerButton).toBeInTheDocument();

    // Click the button to open the dialog
    fireEvent.click(triggerButton);

    // Assert that the dialog content is in the document
    const dialogTitle = screen.getByText(/are you absolutely sure\?/i);
    const dialogDescription = screen.getByText(/this action cannot be undone/i);
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogDescription).toBeInTheDocument();

    // Assert that the Cancel and Continue buttons are in the document
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(cancelButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });

  it("closes the dialog on Cancel button click", () => {
    renderAlertDialog();

    // Click the button to open the dialog
    const triggerButton = screen.getByRole("button", { name: /show dialog/i });
    fireEvent.click(triggerButton);

    // Assert that the dialog content is in the document
    expect(screen.getByText(/are you absolutely sure\?/i)).toBeInTheDocument();

    // Click the Cancel button
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(
      screen.queryByText(/are you absolutely sure\?/i),
    ).not.toBeInTheDocument();
  });

  it("handles Continue button click correctly", () => {
    renderAlertDialog();

    // Click the button to open the dialog
    const triggerButton = screen.getByRole("button", { name: /show dialog/i });
    fireEvent.click(triggerButton);

    // Assert that the dialog content is in the document
    expect(screen.getByText(/are you absolutely sure\?/i)).toBeInTheDocument();

    // Click the Continue button
    const continueButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(continueButton);

    expect(
      screen.queryByRole("heading", { name: /are you absolutely sure\?/i }),
    ).not.toBeInTheDocument();
  });

  it("handles Cancel button click correctly", () => {
    renderAlertDialog();

    // Click the button to open the dialog
    const triggerButton = screen.getByRole("button", { name: /show dialog/i });
    fireEvent.click(triggerButton);

    // Assert that the dialog content is in the document
    expect(screen.getByText(/are you absolutely sure\?/i)).toBeInTheDocument();

    // Click the Continue button
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(
      screen.queryByRole("heading", { name: /are you absolutely sure\?/i }),
    ).not.toBeInTheDocument();
  });
});
