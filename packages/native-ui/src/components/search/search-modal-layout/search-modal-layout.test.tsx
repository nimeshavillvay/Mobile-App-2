import { Text } from "tamagui";
import { SearchModalLayout } from "~/components/search/search-modal-layout";
import { render, screen } from "~/lib/test-utils";

describe("SearchModalLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <SearchModalLayout>
        <Text>Content</Text>
      </SearchModalLayout>,
    );
    expect(screen.getByTestId("search-modal-layout")).toBeOnTheScreen();
  });

  it("applies correct styles to ScrollView", () => {
    render(
      <SearchModalLayout>
        <Text>Content</Text>
      </SearchModalLayout>,
    );
    const ystack = screen.getByTestId("search-modal-layout");
    expect(ystack.props.style).toMatchObject({
      backgroundColor: "white",
      flex: 1,
    });
  });

  it("does not render any unexpected children", () => {
    render(
      <SearchModalLayout>
        <Text>Content</Text>
      </SearchModalLayout>,
    );
    const layout = screen.getByTestId("search-modal-layout");
    expect(layout.props.style).toMatchObject({
      backgroundColor: "white",
      flex: 1,
    });
  });
});
