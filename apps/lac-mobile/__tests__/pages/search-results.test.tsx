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

  // TODO Remove workaround after upgrading Expo and jest-expo
  // Suppress console.error because of this error "Warning: Unexpected ref object provided for ExpoImage. Use either a ref-setter function or React.createRef()."
  // https://github.com/expo/expo/issues/28831
  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-expect-error jest.spyOn adds this functionality
    console.error.mockImplementation(() => null);
  });

  // TODO Remove workaround after upgrading Expo and jest-expo
  // Suppress console.error because of this error "Warning: Unexpected ref object provided for ExpoImage. Use either a ref-setter function or React.createRef()."
  // https://github.com/expo/expo/issues/28831
  afterEach(() => {
    // @ts-expect-error jest.spyOn adds this functionality
    console.error.mockRestore();
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

  it("shows the total number of search results", async () => {
    renderRouter(
      { "search-results": SearchResultsPage },
      { initialUrl: "/search-results?query=test" },
    );

    expect(screen).toHavePathname("/search-results");
    expect(screen).toHaveSearchParams({
      query: "test",
    });

    await screen.findByTestId("total-search-results");

    // Check the count
    expect(screen.getByTestId("total-search-results")).toHaveTextContent(
      "140 products",
    );
  });
});
