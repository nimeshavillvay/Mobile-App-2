import { PhoneNumberInput } from "@/_components/molecules/phone-number-input/phone-number-input";
import { PHONE_NUMBER_VALIDATION } from "@/_lib/zod-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

// Test component that includes both FormProvider and PhoneNumberInput
const TestComponent = ({ disabled = false }) => {
  const methods = useForm({
    resolver: zodResolver(z.object({ phoneNumber: PHONE_NUMBER_VALIDATION })),
  });
  return (
    <FormProvider {...methods}>
      <PhoneNumberInput
        name="phoneNumber"
        control={methods.control}
        disabled={disabled}
      />
    </FormProvider>
  );
};

describe("PhoneNumberInput", () => {
  it("renders with default props", () => {
    render(<TestComponent />);
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  it("formats phone number correctly", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Phone Number");
    await userEvent.type(input, "1234567890");
    expect(input).toHaveValue("(123) 456-7890");
  });

  it("handles partial input correctly", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Phone Number");
    await userEvent.type(input, "123");
    expect(input).toHaveValue("(123");
  });

  it("removes non-numeric characters", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Phone Number");
    await userEvent.type(input, "1a2b3c4d5e");
    expect(input).toHaveValue("(123) 45");
  });

  it("respects the disabled prop", () => {
    render(<TestComponent disabled={true} />);
    const input = screen.getByLabelText("Phone Number");
    expect(input).toBeDisabled();
  });

  it("applies the correct mask", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Phone Number");

    await userEvent.type(input, "1234567890");
    expect(input).toHaveValue("(123) 456-7890");
  });

  it("handles pasting of formatted number correctly", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText("Phone Number") as HTMLInputElement;
    input.focus();

    await userEvent.paste("(987) 654-3210");
    expect(input.value).toBe("(987) 654-3210");
  });
});
