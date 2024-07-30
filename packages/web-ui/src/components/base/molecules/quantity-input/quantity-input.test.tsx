import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import QuantityInput from "./quantity-input";

describe("QuantityInput", () => {
  const defaultProps = {
    minQuantity: 1,
    maxQuantity: 100,
    step: 1,
    initialQuantity: 1,
    uom: "each",
    showLabel: "",
  };

  it("renders with default props", () => {
    render(<QuantityInput />);
    expect(screen.getByRole("textbox")).toHaveValue("1");
    expect(
      screen.getByText("Min Order: 1 Quantity Multiple: 1"),
    ).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    const customProps = {
      minQuantity: 5,
      maxQuantity: 50,
      step: 5,
      initialQuantity: 10,
      uom: "kg",
      showLabel: "Weight",
    };
    render(<QuantityInput {...customProps} />);
    expect(screen.getByLabelText("Weight")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("10");
    expect(
      screen.getByText("Min Order: 5 Quantity Multiple: 5"),
    ).toBeInTheDocument();
    expect(screen.getByText("qty/kg")).toBeInTheDocument();
  });

  it("does not render label when showLabel is empty", () => {
    render(<QuantityInput {...defaultProps} />);
    expect(screen.queryByLabelText("Quantity")).not.toBeInTheDocument();
  });

  it("increments quantity when increment button is clicked", () => {
    render(<QuantityInput {...defaultProps} />);
    const incrementButton = screen.getByLabelText("Increment quantity");
    fireEvent.click(incrementButton);
    expect(screen.getByRole("textbox")).toHaveValue("2");
  });

  it("decrements quantity when decrement button is clicked", () => {
    render(<QuantityInput {...defaultProps} initialQuantity={2} />);
    const decrementButton = screen.getByLabelText("Decrement quantity");
    fireEvent.click(decrementButton);
    expect(screen.getByRole("textbox")).toHaveValue("1");
  });

  it("does not decrement below minQuantity", () => {
    render(<QuantityInput {...defaultProps} />);
    const decrementButton = screen.getByLabelText("Decrement quantity");
    fireEvent.click(decrementButton);
    expect(screen.getByRole("textbox")).toHaveValue("1");
  });

  it("does not increment above maxQuantity", () => {
    render(<QuantityInput {...defaultProps} initialQuantity={100} />);
    const incrementButton = screen.getByLabelText("Increment quantity");
    fireEvent.click(incrementButton);
    expect(screen.getByRole("textbox")).toHaveValue("100");
  });

  it("updates quantity when input value changes", () => {
    render(<QuantityInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "50" } });
    expect(input).toHaveValue("50");
  });

  it("clamps input value to minQuantity when below range", () => {
    render(<QuantityInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "0" } });
    expect(input).toHaveValue("1");
  });

  it("clamps input value to maxQuantity when above range", () => {
    render(<QuantityInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "150" } });
    expect(input).toHaveValue("100");
  });

  it("ignores non-numeric input", () => {
    render(<QuantityInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toHaveValue("1");
  });

  it("respects custom step value when incrementing", () => {
    render(<QuantityInput {...defaultProps} step={5} />);
    const incrementButton = screen.getByLabelText("Increment quantity");
    fireEvent.click(incrementButton);
    expect(screen.getByRole("textbox")).toHaveValue("6");
  });

  it("respects custom step value when decrementing", () => {
    render(<QuantityInput {...defaultProps} initialQuantity={10} step={3} />);
    const decrementButton = screen.getByLabelText("Decrement quantity");
    fireEvent.click(decrementButton);
    expect(screen.getByRole("textbox")).toHaveValue("7");
  });

  it("applies custom className", () => {
    const customClass = "bg-black";
    render(<QuantityInput {...defaultProps} className={customClass} />);
    expect(screen.getByTitle("quantity-input-form")).toHaveClass(customClass);
  });
});
