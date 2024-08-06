import type { FeaturedCategory } from "@repo/shared-logic/zod-schema/category";
import { render, screen } from "~/lib/test-utils";
import {
  FeaturedCategoriesContainer,
  FeaturedCategoriesHeader,
  FeaturedCategoriesList,
} from "./featured-categories";

const FEATURED_CATEGORY: FeaturedCategory = {
  id: "1",
  img: "https://wurthlac.com/test.jpg",
  name: "Test Category",
  direct_item_count: "10",
  item_count: "10",
  shortcode: "test_short_code",
  slug: "test-category",
};

describe("Featured Categories", () => {
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

  it("displays the categories list", () => {
    render(
      <FeaturedCategoriesContainer>
        <FeaturedCategoriesHeader>Featured Categories</FeaturedCategoriesHeader>

        <FeaturedCategoriesList
          data={Array.from({ length: 7 }).map((_, index) => ({
            ...FEATURED_CATEGORY,
            id: index.toString(),
          }))}
        />
      </FeaturedCategoriesContainer>,
    );

    // Check for title
    expect(screen.getByText("Featured Categories")).toBeOnTheScreen();

    // Check for items
    expect(screen.getAllByTestId("featured-category").length).toBe(7);
    expect(screen.getAllByTestId("featured-category-image").length).toBe(7);
    expect(screen.getAllByText("Test Category").length).toBe(7);

    // Check for "View All" button
    expect(screen.getByText("View All")).toBeOnTheScreen();
  });

  it("displays only 7 categories as a maximum", () => {
    render(
      <FeaturedCategoriesContainer>
        <FeaturedCategoriesHeader>Featured Categories</FeaturedCategoriesHeader>

        <FeaturedCategoriesList
          data={Array.from({ length: 10 }).map((_, index) => ({
            ...FEATURED_CATEGORY,
            id: index.toString(),
          }))}
        />
      </FeaturedCategoriesContainer>,
    );

    // Check for items
    expect(screen.getAllByTestId("featured-category").length).toBe(7);
  });
});
