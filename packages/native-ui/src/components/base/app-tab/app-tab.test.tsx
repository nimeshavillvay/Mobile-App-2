import { Text, View } from "tamagui";
import { AppBar } from "~/components/base/app-bar";
import { AppTab } from "~/components/base/app-tab";
import { render, screen } from "~/lib/test-utils";

// Mock the AppBar component
jest.mock("~/components/base/app-bar", () => ({
  AppBar: jest.fn(() => null),
}));

describe("AppTab", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given title and children", () => {
    const title = "Test Title";
    const childContent = "Child Content";
    render(
      <AppTab title={title}>
        <Text>{childContent}</Text>
      </AppTab>,
    );

    const container = screen.getByTestId("app-tab-container");
    expect(container).toBeTruthy();
    expect(screen.getByText(childContent)).toBeTruthy();
  });

  it("passes the correct title to AppBar", () => {
    const title = "Test Title";
    render(
      <AppTab title={title}>
        <Text>Content</Text>
      </AppTab>,
    );

    expect(AppBar).toHaveBeenCalledWith({ title }, {});
  });

  it("renders children correctly", () => {
    const childTestId = "child-component";
    render(
      <AppTab title="Test">
        <View testID={childTestId}>Child Component</View>
      </AppTab>,
    );

    expect(screen.getByTestId(childTestId)).toBeTruthy();
  });

  it("applies correct styles to YStack", () => {
    render(
      <AppTab title="Test">
        <Text>Content</Text>
      </AppTab>,
    );
    const container = screen.getByTestId("app-tab-container");

    expect(container.props.style).toMatchObject({
      flex: 1,
      backgroundColor: "white",
    });
  });

  it("renders AppBar as the first child", () => {
    render(
      <AppTab title="Test">
        <Text>Content</Text>
      </AppTab>,
    );
    const container = screen.getByTestId("app-tab-container");

    expect(container.props.children[0].type).toBe(AppBar);
  });

  it("renders multiple children correctly", () => {
    render(
      <AppTab title="Test">
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </AppTab>,
    );

    expect(screen.getByText("First Child")).toBeTruthy();
    expect(screen.getByText("Second Child")).toBeTruthy();
  });

  it("updates when title prop changes", () => {
    render(
      <AppTab title="Initial Title">
        <div>Content</div>
      </AppTab>,
    );

    screen.rerender(
      <AppTab title="Updated Title">
        <div>Content</div>
      </AppTab>,
    );

    expect(AppBar).toHaveBeenLastCalledWith({ title: "Updated Title" }, {});
  });
});
