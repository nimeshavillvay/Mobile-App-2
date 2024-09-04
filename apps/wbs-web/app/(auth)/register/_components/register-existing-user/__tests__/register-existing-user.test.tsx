import RegisterExistingUser from "@/(auth)/register/_components/register-existing-user/register-existing-user";
import { useCheckRecaptcha } from "@/_context/recaptcha-ref";
import { renderWithClient } from "@/_lib/test-utils";
import { useToast } from "@repo/web-ui/components/base/molecules/toast";
import {
  fireEvent,
  screen,
  waitFor,
  type Screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { server } from "../../../../../../mocks/server";

// Mock the hooks
jest.mock("@/_context/recaptcha-ref");
jest.mock("@repo/web-ui/components/base/molecules/toast");

jest.mock("@/_context/recaptcha-ref", () => ({
  RecaptchaRefProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useCheckRecaptcha: jest.fn().mockReturnValue(() => Promise.resolve()),
}));
jest.mock("@/_hooks/misc/use-debounced-state.hook", () => ({
  __esModule: true,
  default: jest.fn((value) => value), // This makes the debounce immediate
}));
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Set up MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const fillPersonalInformationStep = async (
  screen: Screen,
  customValues = {},
) => {
  const defaultValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    userName: "johndoe",
    password: "password123",
    confirmPassword: "password123",
    phonenumber: "1234567890",
  };

  const values = { ...defaultValues, ...customValues };

  for (const [field, value] of Object.entries(values)) {
    if (field === "phonenumber") {
      // Handle phone number input separately
      const phoneInput = screen.getByTestId(
        `input-${field}`,
      ) as HTMLInputElement;
      await userEvent.type(phoneInput, value as string);
    } else {
      fireEvent.change(screen.getByTestId(`input-${field}`), {
        target: { value },
      });
    }
  }
  const createAccountButton = screen.getByText(
    "Create account",
  ) as HTMLButtonElement;
  await waitFor(() => {
    expect(createAccountButton).not.toBeDisabled();
  });
  fireEvent.click(createAccountButton);
};

describe("RegisterExistingUser", () => {
  beforeEach(() => {
    (useCheckRecaptcha as jest.Mock).mockReturnValue(
      jest.fn().mockResolvedValue(true),
    );
    (useToast as jest.Mock).mockReturnValue({ toast: jest.fn() });
  });

  it("renders the AccountDetailsStep initially", () => {
    renderWithClient(<RegisterExistingUser />);
    expect(screen.getByText("Account details")).toBeInTheDocument();
  });

  it("moves to PersonalInformationStep when AccountDetailsStep is completed", async () => {
    renderWithClient(<RegisterExistingUser />);

    fireEvent.change(screen.getByTestId("input-soldToAccount"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByTestId("input-invoiceNo"), {
      target: { value: "67890" },
    });
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      expect(screen.getByText("Personal Information")).toBeInTheDocument();
    });
  });

  it("submits the form when all fields are filled", async () => {
    renderWithClient(<RegisterExistingUser />);

    // Fill in AccountDetailsStep
    fireEvent.change(screen.getByTestId("input-soldToAccount"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByTestId("input-invoiceNo"), {
      target: { value: "67890" },
    });
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
    });

    await fillPersonalInformationStep(screen);

    await waitFor(() => {
      expect(
        screen.queryByText("Registration unsuccessful. Please try again"),
      ).not.toBeInTheDocument();
    });
  });

  it("displays an error message when registration fails", async () => {
    renderWithClient(<RegisterExistingUser />);

    // Fill in and submit the form
    fireEvent.change(screen.getByTestId("input-soldToAccount"), {
      target: { value: "22222" },
    });
    fireEvent.change(screen.getByTestId("input-invoiceNo"), {
      target: { value: "67890" },
    });
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
    });

    await fillPersonalInformationStep(screen);

    await waitFor(() => {
      expect(
        screen.getByText("Registration unsuccessful. Please try again"),
      ).toBeInTheDocument();
    });
  });

  it("handles recaptcha check failure", async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useCheckRecaptcha as jest.Mock).mockReturnValue(
      jest.fn().mockRejectedValue(new Error("Recaptcha failed")),
    );

    renderWithClient(<RegisterExistingUser />);

    // Fill in and submit the form
    fireEvent.change(screen.getByTestId("input-soldToAccount"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByTestId("input-invoiceNo"), {
      target: { value: "67890" },
    });
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
    });

    await fillPersonalInformationStep(screen);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: "destructive",
          title: "Registration failed.",
        }),
      );
    });
  });

  it("handles invalid account/document combination", async () => {
    renderWithClient(<RegisterExistingUser />);

    // Fill in and submit the form
    fireEvent.change(screen.getByTestId("input-soldToAccount"), {
      target: { value: "11111" },
    });
    fireEvent.change(screen.getByTestId("input-invoiceNo"), {
      target: { value: "11111" },
    });
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
    });

    await fillPersonalInformationStep(screen);

    await waitFor(() => {
      expect(
        screen.getAllByText(
          "Sorry, the account/document combination is invalid.",
        ),
      ).toBeDefined();
    });
  });

  it("handles existing email error", async () => {
    renderWithClient(<RegisterExistingUser />);

    // Fill in and submit the form
    fireEvent.change(screen.getByTestId("input-soldToAccount"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByTestId("input-invoiceNo"), {
      target: { value: "67890" },
    });
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
    });

    await fillPersonalInformationStep(screen, {
      email: "existing@example.com",
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Email address already exists in the database! Please Login to continue.",
        ),
      ).toBeInTheDocument();
    });
  });
});
