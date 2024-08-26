import * as expoRouter from "expo-router";
import { ScreenHeader } from "~/components/base/screen-header";
import { fireEvent, render, screen } from "~/lib/test-utils";

// Mock the necessary modules
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  Link: "Link",
}));
jest.mock("@expo/vector-icons/AntDesign", () => "AntDesign");
jest.mock("@expo/vector-icons/FontAwesome", () => "FontAwesome");
jest.mock("@tamagui/lucide-icons", () => "ScanBarcode");

describe("ScreenHeader", () => {
  const mockBack = jest.fn();
  const mockUseRouter = expoRouter.useRouter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      canGoBack: () => true,
      back: mockBack,
    });
  });

  it("renders the title correctly", () => {
    render(<ScreenHeader title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeOnTheScreen();
  });

  it("shows back button when router.canGoBack() is true", () => {
    render(<ScreenHeader title="Test" />);
    expect(screen.getByTestId("back-button")).toBeOnTheScreen();
  });

  it("calls router.back() when back button is pressed", () => {
    render(<ScreenHeader title="Test" />);
    fireEvent.press(screen.getByTestId("back-button"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("does not show back button when router.canGoBack() is false", () => {
    mockUseRouter.mockReturnValue({
      canGoBack: () => false,
    });
    render(<ScreenHeader title="Test" />);
    expect(screen.queryByTestId("back-button")).toBeNull();
  });

  it('renders search and barcode scan icons when type is not "center-aligned"', () => {
    render(<ScreenHeader title="Test" barcodeScannerPath="/test-path" />);
    expect(screen.getByTestId("search-icon")).toBeOnTheScreen();
    expect(screen.getByTestId("barcode-scan-icon")).toBeOnTheScreen();
  });

  it('does not render search and barcode scan icons when type is "center-aligned"', () => {
    render(<ScreenHeader title="Test" type="center-aligned" />);
    expect(screen.queryByTestId("search-icon")).toBeNull();
    expect(screen.queryByTestId("barcode-scan-icon")).toBeNull();
  });

  it("sets correct href for search icon", () => {
    render(<ScreenHeader title="Test" />);
    expect(screen.getByTestId("search-icon").props.href).toBe("/search");
  });

  it("sets correct href for barcode scan icon", () => {
    render(<ScreenHeader title="Test" barcodeScannerPath="/test-path" />);
    expect(screen.getByTestId("barcode-scan-icon").props.href).toBe(
      "/test-path",
    );
  });

  it("applies correct styles to main View", () => {
    render(<ScreenHeader title="Test" />);
    const mainView = screen.getByTestId("screen-header-main-view");
    expect(mainView.props.style).toMatchObject({
      flexBasis: "auto",
      alignItems: "stretch",
    });
  });

  it("applies correct styles to inner View", () => {
    render(<ScreenHeader title="Test" />);
    const innerView = screen.getByTestId("screen-header-inner-view");
    expect(innerView.props.style).toMatchObject({
      minHeight: 60,
      flexDirection: "row",
      alignItems: "center",
    });
  });

  it("applies correct styles to title Text", () => {
    render(<ScreenHeader title="Test" />);
    const titleText = screen.getByText("Test");
    expect(titleText.props.style).toMatchObject({
      marginLeft: 12,
      marginRight: "auto",
    });
  });

  it("applies correct styles to icons container View", () => {
    render(<ScreenHeader title="Test" />);
    const iconsView = screen.getByTestId("screen-header-icons-view");
    expect(iconsView.props.style).toMatchObject({
      flexDirection: "row",
      paddingRight: 20,
      alignItems: "center",
      columnGap: 20,
    });
  });
});
