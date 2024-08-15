import { fireEvent, render, screen } from "~/lib/test-utils";
import { DropShipItemNotice } from "./drop-ship-item-notice";

describe("Drop Ship Item Notice", () => {
  it("displays the proper data in the button", async () => {
    render(<DropShipItemNotice />);

    const button = await screen.findByText("Drop Ship Item");
    expect(button).toBeOnTheScreen();

    fireEvent.press(button);

    expect(await screen.findByRole("header")).toHaveTextContent(
      "Drop Ship Item",
    );
    expect(
      await screen.findByText(
        "This item ships directly from the vendor. Additional freight charges may apply.",
      ),
    ).toBeOnTheScreen();
  });
});
