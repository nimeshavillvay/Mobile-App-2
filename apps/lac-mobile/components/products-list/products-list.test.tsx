import { cleanup, render, screen } from "@/lib/test-utils";
import ProductsList from "./products-list";

describe("Products List", () => {
  test('it shows "No results" and the "Sorry, no results were found for your search term." description when the list is empty', () => {
    render(<ProductsList data={[]} />);

    expect(screen.getByRole("header")).toHaveTextContent("No results");
    expect(
      screen.getByText("Sorry, no results were found for your search term."),
    ).toBeOnTheScreen();

    cleanup();
  });
});
