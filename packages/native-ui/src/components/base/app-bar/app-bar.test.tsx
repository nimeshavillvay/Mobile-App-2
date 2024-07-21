import * as expoRouter from "expo-router";
import { AppBar } from "~/components/base/app-bar";
import { fireEvent, render, screen } from "~/lib/test-utils";

// Mock the necessary modules
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  Link: "Link",
}));
jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");
jest.mock("@expo/vector-icons/FontAwesome", () => "FontAwesome");
jest.mock(
  "@expo/vector-icons/MaterialCommunityIcons",
  () => "MaterialCommunityIcons",
);

describe("AppBar", () => {
  const mockBack = jest.fn();
  const mockUseRouter = expoRouter.useRouter as jest.Mock;
  const mockUsePathname = expoRouter.usePathname as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      canGoBack: () => true,
      back: mockBack,
    });
    mockUsePathname.mockReturnValue("/current-path");
  });

  it("renders the title correctly", () => {
    render(<AppBar title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeTruthy();
  });

  it("shows back button when router.canGoBack() is true", () => {
    render(<AppBar title="Test" />);
    expect(screen.getByTestId("back-button")).toBeTruthy();
  });

  it("calls router.back() when back button is pressed", () => {
    render(<AppBar title="Test" />);
    fireEvent.press(screen.getByTestId("back-button"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("does not show back button when router.canGoBack() is false", () => {
    mockUseRouter.mockReturnValue({
      canGoBack: () => false,
    });
    render(<AppBar title="Test" />);
    expect(screen.queryByTestId("back-button")).toBeNull();
  });

  it('renders search and barcode scan icons when type is not "search"', () => {
    render(<AppBar title="Test" />);
    expect(screen.getByTestId("search-icon")).toBeTruthy();
    expect(screen.getByTestId("barcode-scan-icon")).toBeTruthy();
  });

  it('does not render title, search and barcode scan icons when type is "search"', () => {
    render(<AppBar title="Test" type="search" />);
    expect(screen.queryByText("Test")).toBeNull();
    expect(screen.queryByTestId("search-icon")).toBeNull();
    expect(screen.queryByTestId("barcode-scan-icon")).toBeNull();
  });

  it("sets correct href for search icon", () => {
    render(<AppBar title="Test" />);
    expect(screen.getByTestId("search-icon").props.href).toBe(
      "/current-path/search",
    );
  });

  it("sets correct href for barcode scan icon", () => {
    render(<AppBar title="Test" />);
    expect(screen.getByTestId("barcode-scan-icon").parent.props.href).toBe(
      "/current-path",
    );
  });

  it("applies correct styles to main View", () => {
    render(<AppBar title="Test" />);
    const mainView = screen.getByTestId("app-bar-main-view");
    expect(mainView.props.style).toMatchObject({
      flexBasis: "auto",
      alignItems: "stretch",
    });
  });

  it("applies correct styles to inner View", () => {
    render(<AppBar title="Test" />);
    const innerView = screen.getByTestId("app-bar-inner-view");
    expect(innerView.props.style).toMatchObject({
      paddingBottom: 10,
      minHeight: 60,
      flexDirection: "row",
      alignItems: "center",
    });
  });

  it("applies correct styles to title Text", () => {
    render(<AppBar title="Test" />);
    const titleText = screen.getByText("Test");
    expect(titleText.props.style).toMatchObject({
      marginLeft: 12,
      marginRight: "auto",
    });
  });

  it("applies correct styles to icons container View", () => {
    render(<AppBar title="Test" />);
    const iconsView = screen.getByTestId("app-bar-icons-view");
    expect(iconsView.props.style).toMatchObject({
      flexDirection: "row",
      paddingRight: 20,
      alignItems: "center",
      columnGap: 20,
    });
  });
});
