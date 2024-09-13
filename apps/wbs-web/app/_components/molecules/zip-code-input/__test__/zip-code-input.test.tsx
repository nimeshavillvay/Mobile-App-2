import { ZipCodeInput } from "@/_components/molecules/zip-code-input";
import { ZIP_CODE_VALIDATION } from "@/_lib/zod-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const TestComponent = ({ disabled = false }) => {
  const methods = useForm({
    resolver: zodResolver(z.object({ zipCode: ZIP_CODE_VALIDATION })),
    mode: "onSubmit",
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <ZipCodeInput
          name="zipCode"
          control={methods.control}
          disabled={disabled}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe("ZipCodeInput", () => {
  it("renders with default props", () => {
    render(<TestComponent />);
    expect(screen.getByLabelText("Zip Code")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("formats zip code correctly", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Zip Code");
    await userEvent.type(input, "12345");
    expect(input).toHaveValue("12345");
  });

  it("handles partial input correctly", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Zip Code");
    await userEvent.type(input, "123");
    expect(input).toHaveValue("123");

    await userEvent.type(input, "4");
    expect(input).toHaveValue("1234");
  });

  it("removes non-numeric characters", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Zip Code");
    await userEvent.type(input, "abc123de45f");
    expect(input).toHaveValue("12345");
  });

  it("respects the disabled prop", () => {
    render(<TestComponent disabled={true} />);
    const input = screen.getByLabelText("Zip Code");
    expect(input).toBeDisabled();
  });

  it("does not show error message before form submission", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Zip Code");
    await userEvent.type(input, "1234");
    expect(
      screen.queryByText("Zip code must be exactly 5 digits"),
    ).not.toBeInTheDocument();
  });

  it("shows error message after form submission with invalid input", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Zip Code");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(input, "1234");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Zip code must be exactly 5 digits"),
      ).toBeInTheDocument();
    });
  });

  it("does not show error message after form submission with valid input", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Zip Code");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(input, "12345");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Zip code must be exactly 5 digits"),
      ).not.toBeInTheDocument();
    });
  });
});
