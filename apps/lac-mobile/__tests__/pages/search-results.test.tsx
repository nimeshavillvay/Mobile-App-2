import { renderRouter, screen } from "@/lib/test-utils-router";
import { server } from "@/mocks/server";
import SearchResultsPage from "../../app/search-results";

describe("Search Results", () => {
  // establish API mocking before all tests
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: "error",
    });
  });
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => {
    server.resetHandlers();
  });
  // clean up once the tests are done
  afterAll(() => {
    server.close();
  });

  it("shows the search results when given the search parameter", async () => {
    renderRouter(
      { "search-results": SearchResultsPage },
      { initialUrl: "/search-results?query=test" },
    );

    expect(screen).toHavePathname("/search-results");
    expect(screen).toHaveSearchParams({
      query: "test",
    });
    expect(screen.getByText('Search Results for "test"')).toBeOnTheScreen();
  });
});
