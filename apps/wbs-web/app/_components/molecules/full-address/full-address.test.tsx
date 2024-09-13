import type { ResponseAddress } from "@/(auth)/register/_components/types";
import { render, screen } from "@testing-library/react";
import React from "react";
import FullAddress from "./full-address";

describe("FullAddress", () => {
  it("renders full address with all fields", () => {
    const address: ResponseAddress = {
      "street-address": "123 Main St",
      locality: "Anytown",
      region: "CA",
      county: "Some County",
      "postal-code": "12345",
      zip4: "6789",
      "country-name": "USA",
    };

    render(<FullAddress address={address} />);

    const fullAddress = screen.getByTestId("full-address");
    expect(fullAddress).toHaveTextContent(
      "123 Main St, Anytown, CA , Some County 12345-6789",
    );
  });
});
