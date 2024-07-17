import { act, render, screen } from "@/lib/test-utils";
import { ProductCard } from "./product-card";

const title =
  'Blum 18" Movento 769 Undermount Drawer Blum 18" Movento 769 Undermount Drawer';
const sku = "NC8053-346A-4G";
const uom = "pair";
const image = "https://picsum.photos/seed/696/3000/2000";

describe("Product Card", () => {
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

  test("displays the product title, SKU, Unit Of Measurement, and Image", async () => {
    const promise = Promise.resolve();

    const price = 34.11;

    render(
      <ProductCard
        productId={1}
        image={image}
        title={title}
        sku={sku}
        details={{
          price,
          listPrice: price,
          uom,
        }}
      />,
    );

    const titleElement = screen.getByRole("header", {
      name: title,
    });
    const skuElement = screen.getByTestId(/^sku-/);
    const uomElement = screen.getByTestId(/^uom-/);
    const imageElement = screen.getByTestId(/^product-image-/);

    // Check for title
    expect(titleElement).toBeDefined();
    // Check for SKU
    expect(skuElement).toBeOnTheScreen();
    // Check for UOM
    expect(uomElement).toBeOnTheScreen();
    // Check for Image
    expect(imageElement).toBeOnTheScreen();

    // Check values
    expect(titleElement.props.children).toBe(title);
    expect(skuElement.props.children).toBe(sku);
    expect(uomElement.props.children).toStrictEqual(["/", uom]);
    expect(imageElement.props.source).toStrictEqual([{ uri: image }]);

    await act(() => promise);
  });

  test("hides the title if the title prop is not given", async () => {
    const promise = Promise.resolve();

    const price = 34.11;

    render(
      <ProductCard
        productId={1}
        image={image}
        sku={sku}
        details={{
          price,
          listPrice: price,
          uom,
        }}
      />,
    );

    // Check for title
    expect(
      screen.queryByRole("header", {
        name: title,
      }),
    ).toBeNull();

    await act(() => promise);
  });

  test("hides the SKU if the 'sku' prop is not given", async () => {
    const promise = Promise.resolve();

    const price = 34.11;

    render(
      <ProductCard
        productId={1}
        image={image}
        title={title}
        details={{
          price,
          listPrice: price,
          uom,
        }}
      />,
    );

    // Check for title
    expect(screen.queryByTestId(/^sku-/)).toBeNull();

    await act(() => promise);
  });

  test("displays only one price and hides the discount label when there is no discount", async () => {
    const promise = Promise.resolve();

    const price = 34.11;

    render(
      <ProductCard
        productId={1}
        image={image}
        title={title}
        sku={sku}
        details={{
          price,
          listPrice: price,
          uom,
        }}
      />,
    );

    const priceElement = screen.getByTestId(/^price-/);

    expect(priceElement).toBeOnTheScreen();
    expect(screen.queryByTestId(/^previous-price-/)).toBeNull();
    expect(screen.queryByTestId(/^discount-label-/)).toBeNull();

    // Check value
    expect(priceElement.props.children).toBe(price);

    await act(() => promise);
  });

  test("displays both the current price and list price, and shows the discount label when there is a discount", async () => {
    const promise = Promise.resolve();

    const price = 18.32;
    const listPrice = 24.32;
    const discountPercentage = Math.ceil(
      ((listPrice - price) / listPrice) * 100,
    );

    render(
      <ProductCard
        productId={1}
        image={image}
        title={title}
        sku={sku}
        details={{
          price,
          listPrice,
          uom,
        }}
      />,
    );

    const priceElement = screen.getByTestId(/^price-/);
    const listPriceElement = screen.getByTestId(/^previous-price-/);
    const discountLabelElement = screen.getByTestId(/^discount-label-/);

    expect(priceElement).toBeOnTheScreen();
    expect(listPriceElement).toBeOnTheScreen();
    expect(discountLabelElement).toBeOnTheScreen();

    const discountValueElement = screen.getByTestId(/^discount-amount-/);

    // Check values
    expect(priceElement.props.children).toBe(price);
    expect(listPriceElement.props.children).toStrictEqual(["$", listPrice]);
    expect(discountValueElement.props.children).toStrictEqual([
      discountPercentage,
      "%",
    ]);

    await act(() => promise);
  });

  test("displays the save to list button", async () => {
    const promise = Promise.resolve();

    const price = 18.32;

    render(
      <ProductCard
        productId={1}
        image={image}
        title={title}
        sku={sku}
        details={{
          price,
          listPrice: price,
          uom,
        }}
      />,
    );

    expect(screen.getByTestId(/^add-to-list-/)).toBeOnTheScreen();

    await act(() => promise);
  });
});
