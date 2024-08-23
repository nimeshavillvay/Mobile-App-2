import { cleanup, renderRouter, screen } from "@/lib/test-utils-router";
import CategoryPage from "../../app/category/[id]";

describe("Search Results", () => {
  afterEach(() => {
    cleanup();
  });

  it("only shows the sub categories list when the category has sub categories", async () => {
    renderRouter(
      { "category/[id]": CategoryPage },
      { initialUrl: "/category/1" },
    );

    expect(screen).toHavePathname("/category/1");

    await screen.findByTestId("category-title");

    expect(screen.getByTestId("category-title")).toHaveTextContent(
      "Woodworking and Shop Supplies",
    );
    expect(
      screen.getAllByTestId("sub-category-list-item").length,
    ).toBeGreaterThan(0);
    expect(
      screen.queryByTestId("category-products-container"),
    ).not.toBeOnTheScreen();
  });

  it("only shows the products list when there are no subcategories", async () => {
    renderRouter(
      { "category/[id]": CategoryPage },
      { initialUrl: "/category/2" },
    );

    expect(screen).toHavePathname("/category/2");

    await screen.findByTestId("category-title");

    expect(screen.getByTestId("category-title")).toHaveTextContent(
      "Woodworking and Shop Supplies",
    );

    expect(screen.queryAllByTestId("sub-category-list-item")).toHaveLength(0);
  });
});
