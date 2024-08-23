import { fireEvent, render, screen } from "~/lib/test-utils";
import { OrderSummary } from "./order-summary";

describe("Order Summary", () => {
  it("hides the order summary details by default", () => {
    render(
      <OrderSummary
        itemsCount={10}
        net={100}
        savings={0}
        shipping={0}
        tax={0}
      />,
    );

    expect(screen.queryByTestId("order-summary-content")).not.toBeOnTheScreen();
  });

  it("shows the order summary details when pressed", async () => {
    render(
      <OrderSummary
        itemsCount={10}
        net={100}
        savings={0}
        shipping={0}
        tax={0}
      />,
    );

    const trigger = screen.getByTestId("order-summary-trigger");

    fireEvent.press(trigger);

    await screen.findByTestId("order-summary-content");

    expect(screen.getByTestId("order-summary-content")).toBeOnTheScreen();
    expect(screen.getByTestId("order-summary-net-price-row")).toHaveTextContent(
      "Subtotal (10 items)" + "$100.00",
    );
    expect(screen.queryByTestId("order-summary-savings")).not.toBeOnTheScreen();
    expect(screen.getByTestId("order-summary-shipping")).toHaveTextContent(
      "Shipping" + "Free",
    );
    expect(screen.getByTestId("order-summary-tax")).toHaveTextContent(
      "Sales Tax" + "$0.00",
    );
  });

  it("shows the savings when it is more than zero", async () => {
    render(
      <OrderSummary
        itemsCount={10}
        net={100}
        savings={10}
        shipping={0}
        tax={0}
      />,
    );

    const trigger = screen.getByTestId("order-summary-trigger");

    fireEvent.press(trigger);

    await screen.findByTestId("order-summary-content");

    expect(screen.getByTestId("order-summary-savings")).toHaveTextContent(
      "Savings" + "-$10.00",
    );
  });

  it("shows the value for shipping instead of free when the shipping is more than zero", async () => {
    render(
      <OrderSummary
        itemsCount={10}
        net={100}
        savings={0}
        shipping={10}
        tax={0}
      />,
    );

    const trigger = screen.getByTestId("order-summary-trigger");

    fireEvent.press(trigger);

    await screen.findByTestId("order-summary-content");

    expect(screen.getByTestId("order-summary-shipping")).toHaveTextContent(
      "Shipping" + "$10.00",
    );
  });
});
