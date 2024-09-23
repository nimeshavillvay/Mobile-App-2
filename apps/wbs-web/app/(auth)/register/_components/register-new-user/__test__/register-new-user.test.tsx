import { RecaptchaRefProvider } from "@/_context/recaptcha-ref";
import { renderWithClient } from "@/_lib/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { server } from "../../../../../../mocks/server";
import RegisterNewUser from "../register-new-user";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/_context/recaptcha-ref", () => ({
  RecaptchaRefProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useCheckRecaptcha: jest.fn().mockReturnValue(() => Promise.resolve()),
}));

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Test setup
const createMockProps = (userType: string = "Buying for business") => ({
  passwordPolicies: {
    minimumLength: 8,
    minimumAlphabets: 1,
    minimumNumbers: 1,
  },
  industries: [{ code: "IND001", name: "Sample Industry" }],
  countries: [{ code: "US", country: "United States" }],
  userType,
});

const setupMockRouter = () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  return mockRouter;
};

const renderComponent = (ui: React.ReactElement) => {
  return renderWithClient(<RecaptchaRefProvider>{ui}</RecaptchaRefProvider>);
};

// Helper functions
const fillPersonalDetails = (includeCompanyName: boolean = true) => {
  if (includeCompanyName) {
    fireEvent.change(screen.getByTestId("input-companyName"), {
      target: { value: "Test Company" },
    });
  }
  fireEvent.change(screen.getByTestId("input-firstName"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByTestId("input-lastName"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByTestId("input-email"), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByTestId("input-phoneNumber"), {
    target: { value: "1234567890" },
  });
  fireEvent.change(screen.getByTestId("input-userName"), {
    target: { value: "johndoe" },
  });
  fireEvent.change(screen.getByTestId("input-password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByTestId("input-confirmPassword"), {
    target: { value: "password123" },
  });
};

const fillBillingDetails = () => {
  fireEvent.change(screen.getByTestId("input-billingAddress"), {
    target: { value: "123 Main St" },
  });
  fireEvent.change(screen.getByTestId("input-billingCity"), {
    target: { value: "Test City" },
  });
  fireEvent.change(screen.getByTestId("input-billingPostCode"), {
    target: { value: "12345" },
  });
};

const submitForm = () => {
  fireEvent.click(screen.getByRole("button", { name: /continue/i }));
};

describe("RegisterNewUser Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());

  beforeEach(() => {
    setupMockRouter();
  });

  it("renders the registration form correctly", () => {
    const nonBusinessProps = createMockProps("Buying for business");
    renderComponent(<RegisterNewUser {...nonBusinessProps} />);
    expect(
      screen.getByText("Company and personal details"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("input-companyName")).toBeInTheDocument();
    expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("input-lastName")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-phoneNumber")).toBeInTheDocument();
    expect(screen.getByTestId("input-userName")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("input-confirmPassword")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i }),
    ).toBeInTheDocument();
  });

  it("submits the form with user details and renders billing form", async () => {
    const nonBusinessProps = createMockProps("Buying for business");
    renderComponent(<RegisterNewUser {...nonBusinessProps} />);
    fillPersonalDetails();
    submitForm();

    await screen.findByText("Billing address");

    expect(screen.getByTestId("input-billingAddress")).toBeInTheDocument();
    expect(screen.getByTestId("input-billingCity")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Country" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "State" })).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "County (Optional)" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("input-billingPostCode")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-sameAsBilling")).toBeInTheDocument();
  });

  it("renders shipping address fields when 'Same billing address' checkbox is unchecked", async () => {
    const nonBusinessProps = createMockProps("Buying for business");
    renderComponent(<RegisterNewUser {...nonBusinessProps} />);
    fillPersonalDetails();
    submitForm();

    await screen.findByText("Billing address");

    expect(
      screen.queryByTestId("input-shippingStreetAddress"),
    ).not.toBeInTheDocument();

    const sameAddressCheckbox = screen.getByTestId("checkbox-sameAsBilling");
    fireEvent.click(sameAddressCheckbox);

    await screen.findByTestId("input-shippingStreetAddress");
  });

  it("displays PO Box warning when PO Box is entered in billing address", async () => {
    const nonBusinessProps = createMockProps("Buying for business");
    renderComponent(<RegisterNewUser {...nonBusinessProps} />);
    fillPersonalDetails();
    submitForm();

    await screen.findByText("Billing address");

    fireEvent.change(screen.getByTestId("input-billingAddress"), {
      target: { value: "PO Box 123" },
    });
    fireEvent.change(screen.getByTestId("input-billingCity"), {
      target: { value: "Test City" },
    });
    fireEvent.change(screen.getByTestId("input-billingPostCode"), {
      target: { value: "12345" },
    });

    submitForm();

    await screen.findByText("Shipping Address cannot be a PO Box");
  });

  it("validates tax document fields and displays appropriate errors", async () => {
    const nonBusinessProps = createMockProps("Buying for business");
    renderComponent(<RegisterNewUser {...nonBusinessProps} />);
    fillPersonalDetails();
    submitForm();

    await screen.findByText("Billing address");

    fireEvent.change(screen.getByTestId("input-billingAddress"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByTestId("input-billingCity"), {
      target: { value: "Test City" },
    });
    fireEvent.change(screen.getByTestId("input-billingPostCode"), {
      target: { value: "12345" },
    });

    submitForm();

    await screen.findByText("Additional details");

    fireEvent.change(screen.getByTestId("input-federalTaxId"), {
      target: { value: "12-34567" },
    });
    fireEvent.change(screen.getByTestId("input-employees"), {
      target: { value: "0" },
    });

    submitForm();

    await screen.findByText("Federal Tax ID must be 9 digits");
    await screen.findByText("Please select an industry");
    await screen.findByText("Please enter at least 1 employee");
  });

  it("validates tax document checkbox and error for not adding tax documents", async () => {
    const nonBusinessProps = createMockProps("Buying for business");
    renderComponent(<RegisterNewUser {...nonBusinessProps} />);
    fillPersonalDetails();
    submitForm();

    await screen.findByText("Billing address");

    fireEvent.change(screen.getByTestId("input-billingAddress"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByTestId("input-billingCity"), {
      target: { value: "Test City" },
    });
    fireEvent.change(screen.getByTestId("input-billingPostCode"), {
      target: { value: "12345" },
    });

    submitForm();

    await screen.findByText("Additional details");

    fireEvent.change(screen.getByTestId("input-federalTaxId"), {
      target: { value: "12-34567" },
    });
    fireEvent.change(screen.getByTestId("input-employees"), {
      target: { value: "0" },
    });

    fireEvent.click(screen.getByTestId("checkbox-taxExempt"));

    submitForm();

    await screen.findByText("Federal Tax ID must be 9 digits");
    await screen.findByText("Please select an industry");
    await screen.findByText("Please enter at least 1 employee");
  });

  it("handles non-business user registration without company name and tax information", async () => {
    const nonBusinessProps = createMockProps("Homeowner");
    renderComponent(<RegisterNewUser {...nonBusinessProps} />);

    // Check that company name field is not present
    expect(screen.queryByTestId("input-companyName")).not.toBeInTheDocument();

    // Fill out personal details (without company name)
    fillPersonalDetails(false);
    submitForm();

    // Wait for billing address form
    await screen.findByText("Billing address");

    // Fill out billing details
    fillBillingDetails();
    submitForm();

    // Check that we don't see the "Additional details" (tax information) section
    await waitFor(() =>
      expect(screen.queryByText("Additional details")).not.toBeInTheDocument(),
    );
  });
});
