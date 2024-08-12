import { render, screen } from "~/lib/test-utils";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders the checkbox without the check icon", () => {
    render(<Checkbox />);

    expect(screen.getByTestId("checkbox")).toBeOnTheScreen();
    expect(screen.queryByTestId("check-icon")).not.toBeOnTheScreen();
  });

  it("renders the checkbox with the check icon", () => {
    render(<Checkbox checked />);

    expect(screen.getByTestId("checkbox")).toBeOnTheScreen();
    expect(screen.getByTestId("check-icon")).toBeOnTheScreen();
  });
});
