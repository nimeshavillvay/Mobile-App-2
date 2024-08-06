import type { Banner } from "@repo/shared-logic/zod-schema/banner";
import { render, screen } from "~/lib/test-utils";
import { BannersCarousel, BannersCarouselItem } from "./banners";

const BANNER: Banner["banners"][number] = {
  id: "250",
  slot: "mainSlot",
  class: "slide-top-home",
  "data-descr": "Vauth Sagel Kitchen Convenience Accessories",
  active: 1,
  alt_tag: "Vauth Sagel Kitchen Convenience Accessories",
  priority: "10",
  html_content: "",
  pdf_file_name: "LP2086-WLAC-VH-Premier-Products-No_Links.pdf",
  pdf_file_path:
    "https://xcart.wurthlac.com/assets/banners/LP2086-WLAC-VH-Premier-Products-No_Links.pdf",
  use_custom_link: 0,
  custom_url: "",
  file_name: "LP2086-Vauth_Sagel.png",
  file_path: "https://xcart.wurthlac.com/images/A/LP2086-Vauth_Sagel.png",
  mobile_file_name: "default_image.svg",
  mobile_file_path: "https://xcart.wurthlac.com/default_image.svg",
};

describe("Banners", () => {
  // TODO Remove workaround after upgrading Expo and jest-expo
  // Suppress console.error because of this error "Warning: Unexpected ref object provided for ExpoImage. Use either a ref-setter function or React.createRef()."
  // https://github.com/expo/expo/issues/28831
  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-expect-error jest.spyOn adds this functionality
    console.error.mockImplementation(() => null);
  });

  // TODO Remove workaround after upgrading Expo and jest-expo
  // Suppress console.error because of this error "Warning: Unexpected ref object provided for ExpoImage. Use either a ref-setter function or React.createRef()."
  // https://github.com/expo/expo/issues/28831
  afterEach(() => {
    // @ts-expect-error jest.spyOn adds this functionality
    console.error.mockRestore();
  });

  test("it displays properly", async () => {
    const width = 1000;
    const imageWidth = width - 16 * 2;
    const imageHeight = imageWidth / 2;

    render(
      <BannersCarousel
        width={width}
        height={width / 2}
        data={Array.from({ length: 5 }).map((_, index) => ({
          ...BANNER,
          id: index.toString(),
        }))}
        renderItem={({ item }) => (
          <BannersCarouselItem
            image={item.file_path}
            alt={item.alt_tag}
            width={imageWidth}
            height={imageHeight}
            onPress={jest.fn}
          />
        )}
      />,
    );

    // Wait for the carousel items to load
    await screen.findAllByTestId(/__CAROUSEL_ITEM_[0-9]*_READY__/);

    // Check if the correct number of carousel items have been rendered
    expect(screen.getAllByTestId("banner-carousel-item").length).toBe(5);
  });
});
