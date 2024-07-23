import { render, screen } from "@/lib/test-utils";
import { server } from "@/mocks/server";
import ProductCard from "./product-card";

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

  // establish API mocking before all tests
  beforeAll(() => {
    server.listen();
  });
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => {
    server.resetHandlers();
  });
  // clean up once the tests are done
  afterAll(() => {
    server.close();
  });

  test("displays the component with the prices from the price check query", async () => {
    render(
      <ProductCard
        productId={1}
        image={image}
        title={title}
        sku={sku}
        uom={uom}
        token="token"
      />,
    );

    await screen.findByRole("header");

    // Check for certain fields
    expect(screen.getByRole("header")).toBeOnTheScreen();
    expect(screen.getByTestId(/^price/)).toBeOnTheScreen();
  });
});
