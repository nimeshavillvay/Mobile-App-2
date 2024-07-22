import { Text, View } from "tamagui";
import { ScreenLayout } from "~/components/base/screen-layout";
import { render, screen } from "~/lib/test-utils";

// Mock the ScreenHeader component
jest.mock("~/components/base/screen-header", () => ({
  ScreenHeader: jest.fn(() => null),
}));

describe("ScreenLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given title and children", () => {
    const childContent = "Child Content";
    render(
      <ScreenLayout>
        <Text>{childContent}</Text>
      </ScreenLayout>,
    );

    const container = screen.getByTestId("screen-layout-container");
    expect(container).toBeOnTheScreen();
    expect(screen.getByText(childContent)).toBeOnTheScreen();
  });

  it("renders children correctly", () => {
    const childTestId = "child-component";
    render(
      <ScreenLayout>
        <View testID={childTestId}>Child Component</View>
      </ScreenLayout>,
    );

    expect(screen.getByTestId(childTestId)).toBeOnTheScreen();
  });

  it("applies correct styles to YStack", () => {
    render(
      <ScreenLayout>
        <Text>Content</Text>
      </ScreenLayout>,
    );
    const container = screen.getByTestId("screen-layout-container");

    expect(container.props.style).toMatchObject({
      flex: 1,
      backgroundColor: "white",
    });
  });

  it("renders multiple children correctly", () => {
    render(
      <ScreenLayout>
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </ScreenLayout>,
    );

    expect(screen.getByText("First Child")).toBeOnTheScreen();
    expect(screen.getByText("Second Child")).toBeOnTheScreen();
  });
});
