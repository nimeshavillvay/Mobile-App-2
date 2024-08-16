import { fireEvent, render, screen } from "~/lib/test-utils";
import { RegionallyExclusiveItemNotice } from "./regionally-exclusive-item-notice";

describe("Regionally Exclusive Item Notice", () => {
  it("displays the proper data in the button", async () => {
    render(<RegionallyExclusiveItemNotice />);

    const button = await screen.findByText("Not Available");
    expect(button).toBeOnTheScreen();

    fireEvent.press(button);

    expect(await screen.findByRole("header")).toHaveTextContent(
      "Not Available",
    );
    expect(
      await screen.findByText(
        "This item is not available in certain regions. For better experience please Sign in or register.",
      ),
    ).toBeOnTheScreen();
  });
});
