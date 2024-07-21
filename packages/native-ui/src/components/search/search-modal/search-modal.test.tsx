import { AppBar } from "~/components/base/app-bar";
import { SearchBox } from "~/components/search/search-box";
import { SearchModalLayout } from "~/components/search/search-modal";
import { render, screen } from "~/lib/test-utils";

// Mock the imported components
jest.mock("~/components/base/app-bar", () => ({
  AppBar: jest.fn(() => null),
}));
jest.mock("~/components/search/search-box", () => ({
  SearchBox: jest.fn(() => null),
}));

describe("SearchModalLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<SearchModalLayout />);
    expect(screen.getByTestId("search-modal-layout")).toBeTruthy();
  });

  it("renders AppBar with correct props", () => {
    render(<SearchModalLayout />);
    expect(AppBar).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Search",
        type: "search",
      }),
      expect.anything(),
    );
  });

  it("renders SearchBox", () => {
    render(<SearchModalLayout />);
    expect(SearchBox).toHaveBeenCalled();
  });

  it("applies correct styles to YStack", () => {
    render(<SearchModalLayout />);
    const ystack = screen.getByTestId("search-modal-layout");
    expect(ystack.props.style).toMatchObject({
      backgroundColor: "white",
      flex: 1,
    });
  });

  it("renders AppBar before SearchBox", () => {
    render(<SearchModalLayout />);
    const layout = screen.getByTestId("search-modal-layout");
    expect(layout.props.children[0].type).toBe(AppBar);
    expect(layout.props.children[1].type).toBe(SearchBox);
  });

  it("does not render any unexpected children", () => {
    render(<SearchModalLayout />);
    const layout = screen.getByTestId("search-modal-layout");
    expect(layout.props.style).toMatchObject({
      backgroundColor: "white",
      flex: 1,
    });
  });
});
