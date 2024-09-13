import type { ResponseAddress } from "@/(auth)/register/_components/types";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AddressSelector from "./address-selector";

const mockBillingAddresses: ResponseAddress[] = [
  {
    "country-name": "USA",
    county: "Some County",
    locality: "Anytown",
    region: "CA",
    "street-address": "123 Main St",
    "postal-code": "12345",
    zip4: "6789",
  },
  {
    "country-name": "USA",
    county: "Another County",
    locality: "Othertown",
    region: "NY",
    "street-address": "456 Oak Ave",
    "postal-code": "67890",
    zip4: "1234",
  },
];

const mockShippingAddresses: ResponseAddress[] = [
  {
    "country-name": "USA",
    county: "Third County",
    locality: "Somewhere",
    region: "TX",
    "street-address": "789 Pine Rd",
    "postal-code": "54321",
    zip4: "8765",
  },
];

const mockCurrentBillingAddress: ResponseAddress[] = [
  {
    "country-name": "USA",
    county: "Current County",
    locality: "Current City",
    region: "NY",
    "street-address": "999 Current St",
    "postal-code": "11111",
    zip4: "2222",
  },
];

const mockCurrentShippingAddress: ResponseAddress[] = [
  {
    "country-name": "USA",
    county: "Current Ship County",
    locality: "Current Ship City",
    region: "CA",
    "street-address": "888 Current Ship St",
    "postal-code": "33333",
    zip4: "4444",
  },
];

const mockUpdateAddress = jest.fn();
const mockClearSuggestions = jest.fn();

describe("AddressSelector", () => {
  it("renders without crashing", () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={false}
      />,
    );
    expect(screen.getByText("Address Conflict")).toBeInTheDocument();
  });

  it("displays billing and shipping addresses with correct titles", () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={false}
      />,
    );
    expect(
      screen.getByText("Billing address recommended by UPS"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Shipping address recommended by UPS"),
    ).toBeInTheDocument();

    const billingAddressButton = screen.getByRole("button", {
      name: "123 Main St, Anytown , CA , Some County 12345-6789",
    });
    expect(billingAddressButton).toBeInTheDocument();

    const shippingAddressButton = screen.getByRole("button", {
      name: "789 Pine Rd, Somewhere , TX , Third County 54321-8765",
    });
    expect(shippingAddressButton).toBeInTheDocument();
  });

  it("displays current billing and shipping addresses when provided", () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={false}
        currentBillingAddress={mockCurrentBillingAddress}
        currentShippingAddress={mockCurrentShippingAddress}
      />,
    );
    expect(
      screen.getByText("Billing address entered by you"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Shipping address entered by you"),
    ).toBeInTheDocument();

    const currentBillingAddressButton = screen.getByRole("button", {
      name: "999 Current St, Current City , NY , Current County 11111-2222",
    });
    expect(currentBillingAddressButton).toBeInTheDocument();

    const currentShippingAddressButton = screen.getByRole("button", {
      name: "888 Current Ship St, Current Ship City , CA , Current Ship County 33333-4444",
    });
    expect(currentShippingAddressButton).toBeInTheDocument();
  });

  it("does not display current addresses when not provided", () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={false}
      />,
    );

    expect(
      screen.queryByText("Billing address entered by you"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Shipping address entered by you"),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Billing address recommended by UPS"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Shipping address recommended by UPS"),
    ).toBeInTheDocument();

    const recommendedBillingAddressButton = screen.getByRole("button", {
      name: "123 Main St, Anytown , CA , Some County 12345-6789",
    });
    expect(recommendedBillingAddressButton).toBeInTheDocument();

    const recommendedShippingAddressButton = screen.getByRole("button", {
      name: "789 Pine Rd, Somewhere , TX , Third County 54321-8765",
    });
    expect(recommendedShippingAddressButton).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "999 Current St, Current City , NY , Current County 11111-2222",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "888 Current Ship St, Current Ship City , CA , Current Ship County 33333-4444",
      }),
    ).not.toBeInTheDocument();
  });

  it("allows selection of addresses and enables submit button", () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={false}
      />,
    );

    const billingAddressButton = screen.getByRole("button", {
      name: "123 Main St, Anytown , CA , Some County 12345-6789",
    });
    const shippingAddressButton = screen.getByRole("button", {
      name: "789 Pine Rd, Somewhere , TX , Third County 54321-8765",
    });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();

    fireEvent.click(billingAddressButton);
    fireEvent.click(shippingAddressButton);

    expect(submitButton).not.toBeDisabled();
  });

  it("calls updateAddress when submit button is clicked", () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={false}
      />,
    );

    const billingAddressButton = screen.getByRole("button", {
      name: "123 Main St, Anytown , CA , Some County 12345-6789",
    });
    const shippingAddressButton = screen.getByRole("button", {
      name: "789 Pine Rd, Somewhere , TX , Third County 54321-8765",
    });

    fireEvent.click(billingAddressButton);
    fireEvent.click(shippingAddressButton);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(mockUpdateAddress).toHaveBeenCalledWith({
      billing: mockBillingAddresses[0],
      shipping: mockShippingAddresses[0],
    });
  });

  it("disables submit button when addresses are not selected", () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={false}
      />,
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();
  });

  it('calls clearSuggestions when "Edit address" is clicked', () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={false}
      />,
    );

    const editButton = screen.getByRole("button", { name: "Edit address" });
    fireEvent.click(editButton);

    expect(mockClearSuggestions).toHaveBeenCalled();
  });

  it("disables all interactions when disabled prop is true", () => {
    render(
      <AddressSelector
        billingAddresses={mockBillingAddresses}
        shippingAddresses={mockShippingAddresses}
        updateAddress={mockUpdateAddress}
        clearSuggestions={mockClearSuggestions}
        disabled={true}
      />,
    );

    const addressButtons = screen.getAllByRole("button");
    addressButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
