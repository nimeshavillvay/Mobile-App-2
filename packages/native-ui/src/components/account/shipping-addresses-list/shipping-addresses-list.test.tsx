import { render, screen } from "~/lib/test-utils";
import {
  ShippingAddressListItem,
  ShippingAddressesList,
} from "./shipping-addresses-list";

const item = {
  countryName: "US",
  county: "MARICOPA",
  default: false,
  defaultShipping: false,
  locality: "APACHE JUNCTION",
  organization: "test test",
  phoneNumber: "(123) 456-7890",
  postalCode: "85120",
  region: "AZ",
  routeInfo: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    route: null,
    routeName: "",
  },
  shipTo: "1593661",
  streetAddress: "5160 S DELAWARE DR",
  xcAddressId: "219242",
  zip4: "6141",
};

describe("Shipping Addresses List Item", () => {
  it("should display the item properly", () => {
    render(<ShippingAddressListItem item={item} />);

    expect(screen.getByTestId("shipping-address-list-item")).toBeOnTheScreen();

    expect(
      screen.getByTestId("shipping-address-list-item-organization-name"),
    ).toHaveTextContent(item.organization);
    expect(
      screen.queryByTestId("shipping-address-list-item-default-label"),
    ).not.toBeOnTheScreen();
    expect(
      screen.getByTestId("shipping-address-list-item-shipping-no"),
    ).toHaveTextContent(`Shipping # ${item.shipTo}`);

    expect(
      screen.getByTestId("shipping-address-list-item-map-icon"),
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId("shipping-address-list-item-address-line-1"),
    ).toHaveTextContent(`${item.streetAddress}, ${item.region}`);
    expect(
      screen.getByTestId("shipping-address-list-item-address-line-2"),
    ).toHaveTextContent(
      `${item.county}, ${item.postalCode}-${item.zip4}, ${item.countryName}`,
    );

    expect(
      screen.getByTestId("shipping-address-list-item-phone-icon"),
    ).toBeOnTheScreen();
    expect(
      screen.getByTestId("shipping-address-list-item-phone-no"),
    ).toHaveTextContent(item.phoneNumber);
  });

  it("should not display the Zip code if it is a falsy value", () => {
    render(
      <ShippingAddressListItem
        item={{
          ...item,
          zip4: "",
        }}
      />,
    );

    expect(
      screen.getByTestId("shipping-address-list-item-address-line-2"),
    ).toHaveTextContent(
      `${item.county}, ${item.postalCode}, ${item.countryName}`,
    );
  });

  it("should display the Default label when the address is default", () => {
    render(
      <ShippingAddressListItem
        item={{
          ...item,
          default: true,
        }}
      />,
    );

    expect(
      screen.getByTestId("shipping-address-list-item-default-label"),
    ).toHaveTextContent("Default");
  });
});

describe("Shipping Addresses List", () => {
  it("renders the list", () => {
    render(
      <ShippingAddressesList
        data={[item, { ...item, default: true, xcAddressId: "219243" }]}
      />,
    );

    expect(screen.getAllByTestId("shipping-address-list-item")).toHaveLength(2);
  });
});
