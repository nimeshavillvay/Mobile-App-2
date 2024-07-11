import { renderRouter, screen, testRouter } from "expo-router/testing-library";

describe("Tabs", () => {
  it("has all pages in tab buttons", () => {
    renderRouter(["index", "shop", "cart", "updates", "more"], {
      initialUrl: "/",
    });

    expect(screen).toHavePathname("/");

    testRouter.navigate("/shop");
    expect(screen).toHavePathname("/shop");

    testRouter.navigate("/cart");
    expect(screen).toHavePathname("/cart");

    testRouter.navigate("/updates");
    expect(screen).toHavePathname("/updates");

    testRouter.navigate("/more");
    expect(screen).toHavePathname("/more");
  });
});
