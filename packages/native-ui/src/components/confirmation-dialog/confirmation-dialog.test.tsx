import { Button } from "tamagui";
import { fireEvent, render, screen } from "~/lib/test-utils";
import { ConfirmationDialog } from "./confirmation-dialog";

describe("Confirmation Dialog", () => {
  it("displays the confirmation dialog when the trigger is pressed", async () => {
    const onConfirm = jest.fn();

    render(
      <ConfirmationDialog
        title="Confirmation Title"
        description="Confirmation Description"
        onConfirm={onConfirm}
      >
        <Button>Confirmation Trigger</Button>
      </ConfirmationDialog>,
    );

    const button = await screen.findByText("Confirmation Trigger");
    expect(button).toBeOnTheScreen();

    fireEvent.press(button);

    expect(await screen.findByRole("header")).toHaveTextContent(
      "Confirmation Title",
    );
    expect(
      await screen.findByText("Confirmation Description"),
    ).toBeOnTheScreen();
  });

  it("calls the onConfirm function when the 'Confirm' button is pressed", async () => {
    const onConfirm = jest.fn();

    render(
      <ConfirmationDialog
        title="Confirmation Title"
        description="Confirmation Description"
        onConfirm={onConfirm}
      >
        <Button>Confirmation Trigger</Button>
      </ConfirmationDialog>,
    );

    const button = await screen.findByText("Confirmation Trigger");
    fireEvent.press(button);

    const confirmButton = await screen.findByText("Confirm");
    expect(confirmButton).toBeOnTheScreen();

    fireEvent.press(confirmButton);

    expect(onConfirm).toHaveBeenCalled();
  });
});
