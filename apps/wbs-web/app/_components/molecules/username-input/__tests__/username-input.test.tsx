import { UsernameInput } from "@/_components/molecules/username-input/username-input";
import { renderWithClient } from "@/_lib/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { server } from "../../../../../mocks/server";

// Mock the debounce hook to be instantaneous for testing purposes
jest.mock("@/_hooks/misc/use-debounced-state.hook", () => ({
  __esModule: true,
  default: jest.fn((value) => value),
}));

// Test component that includes both FormProvider and UsernameInput
const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      userName: "", // Initialize with an empty string
    },
  });
  return (
    <FormProvider {...methods}>
      <UsernameInput control={methods.control} name="userName" />
    </FormProvider>
  );
};

describe("UsernameInput", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("renders with default props", () => {
    renderWithClient(<TestComponent />);
    expect(screen.getByText("Requested User ID")).toBeInTheDocument();
  });

  it("shows no error when username is available", async () => {
    renderWithClient(<TestComponent />);
    fireEvent.change(screen.getByTestId("input-userName"), {
      target: { value: "testuser" },
    });

    await waitFor(() => {
      expect(
        screen.queryByText(
          "The User ID you entered already exists. Please enter a new User ID",
        ),
      ).not.toBeInTheDocument();
    });
  });

  it("displays error message when username is taken", async () => {
    renderWithClient(<TestComponent />);
    fireEvent.change(screen.getByTestId("input-userName"), {
      target: { value: "testuserexisting" },
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "The User ID you entered already exists. Please enter a new User ID",
        ),
      ).toBeInTheDocument();
    });
  });

  it("disables input when checking username", async () => {
    renderWithClient(<TestComponent />);

    const input = screen.getByTestId("input-userName");
    fireEvent.change(input, { target: { value: "testuser" } });

    await waitFor(() => {
      expect(input).toBeDisabled();
    });

    await waitFor(() => {
      expect(input).not.toBeDisabled();
    });
  });
});
