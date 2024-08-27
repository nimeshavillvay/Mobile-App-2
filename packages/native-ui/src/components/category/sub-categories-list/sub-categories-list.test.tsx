import { render, screen } from "~/lib/test-utils";
import { SubCategoriesList, SubCategoryListItem } from "./sub-categories-list";

const SUB_CATEGORIES = [
  {
    id: "137",
    image:
      "https://wurthlac-dev.x-shops.com/images/C/Abrasives-Disks_1-01-01.png",
    slug: "woodworking-and-shop-abrasives",
    title: "Abrasives",
  },
  {
    id: "517",
    image:
      "https://wurthlac-dev.x-shops.com/images/C/Adhesives-CaulkingandSealants_2-01-01.png",
    slug: "adhesives-caulking-sealants",
    title: "Adhesives, Caulking & Sealants",
  },
  {
    id: "617",
    image:
      "https://wurthlac-dev.x-shops.com/images/C/Bathroom-Curling_Iron_Holders_1-01-01.png",
    slug: "bathroom-hardware-and-accessories",
    title: "Bathroom Hardware & Accessories",
  },
] as const;

describe("Sub Categories List", () => {
  it("doesn't show anything when the subcategories list is empty", () => {
    render(<SubCategoriesList data={[]} />);

    expect(screen.queryAllByTestId("sub-category-list-item")).toHaveLength(0);
  });

  it("shows the sub categories list when the list is not empty", () => {
    render(<SubCategoriesList data={SUB_CATEGORIES} />);

    expect(screen.getAllByTestId("sub-category-list-item")).toHaveLength(
      SUB_CATEGORIES.length,
    );
  });
});

describe("Sub Categories List Item", () => {
  it("shows the sub category details properly", () => {
    const subCategory = SUB_CATEGORIES[0];

    render(<SubCategoryListItem index={0} item={subCategory} />);

    expect(screen.getByTestId("sub-category-list-item")).toBeOnTheScreen();
    expect(screen.getByTestId("sub-category-link")).toHaveProp(
      "href",
      `/shop/category/${subCategory.id}`,
    );
    expect(screen.getByTestId("sub-category-image")).toHaveProp("source", [
      {
        uri: subCategory.image,
      },
    ]);
    expect(screen.getByTestId("sub-category-title")).toHaveTextContent(
      subCategory.title,
    );
  });
});
