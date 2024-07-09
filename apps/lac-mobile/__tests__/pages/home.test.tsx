import { renderRouter, screen } from "expo-router/testing-library";

describe("Home page", () => {
  it("has the home page route", () => {
    renderRouter(["index"], {
      initialUrl: "/",
    });

    expect(screen).toHavePathname("/");
  });
});
