import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
  SearchClearButton,
} from "./search-box";

/**
 * Represents the metadata for the `SearchBox` component.
 * This is for storybook purpose only
 *
 * @typedef {object} Meta
 * @property {string} title - The title of the component. (Default: "Components/Search Box")
 * @property {typeof SearchBox} component - The component to be displayed.
 * @property {object} parameters - The parameters for the component.
 * @property {string} parameters.layout - The layout style of the component. (Default: "centered")
 */
const meta: Meta<typeof SearchBox> = {
  title: "Components/Search Box",
  component: SearchBox,
  parameters: {
    layout: "centered",
  },
};

const items = {
  products: {
    summary: {
      total: 250,
      page_size: 10,
      page_no: 1,
      plp: false,
    },
    results: [
      {
        id: "se901",
        description: "Harper Lee",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "9OZ ADH - ICE WHITE",
        slug: "90z-adh-ice-white",
      },
      {
        id: "se902",
        description: "Lev Tolstoy",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "19OZ ADH - ICE WHITE",
        slug: "90z-adh-ice-white",
      },
      {
        id: "se903",
        description: "Fyodor Dostoyevsky",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "29OZ ADH - ICE WHITE ",
        slug: "90z-adh-ice-white",
      },
      {
        id: "se904",
        description: "Harper Lee",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "9OZ ADH - ICE WHITE",
        slug: "90z-adh-ice-white",
      },
      {
        id: "se905",
        description: "Lev Tolstoy",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "19OZ ADH - ICE WHITE",
        slug: "90z-adh-ice-white",
      },
      {
        id: "se906",
        description: "Fyodor Dostoyevsky",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "29OZ ADH - ICE WHITE",
        slug: "90z-adh-ice-white",
      },
      {
        id: "se907",
        description: "Harper Lee",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "9OZ ADH - ICE WHITE",
        slug: "90z-adh-ice-white",
      },
    ],
  },

  brands: {
    summary: {
      total: 250,
      page_size: 10,
      page_no: 1,
      plp: false,
    },
    results: [
      {
        id: "638887",
        description: "Oscar Wilde",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "Formica Adhesive",
        slug: "formica-adhesive",
      },
      {
        id: "638884",
        description: "George Orwell",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "Choice Brands Adhesives",
        slug: "choice-brands-adhesives",
      },
      {
        id: "638885",
        description: "Jane Austen",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "Integra Adhesives",
        slug: "integra-adhesive",
      },
    ],
  },

  categories: {
    summary: {
      total: 250,
      page_size: 10,
      page_no: 1,
      plp: false,
    },
    results: [
      {
        id: "6388874",
        description: "Oscar Wilde",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "Adhesives, Caulking & Sealants / Adhesives ",
        slug: "adhesives-caulking-&-sealants-/-adhesives",
      },
      {
        id: "6388875",
        description: "George Orwell",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "Adhesives, Caulking & Sealants / Adhesive Hoses",
        slug: "adhesives-caulking-&-sealants-/-adhesives-hoses",
      },
      {
        id: "6388876",
        description: "Jane Austen",
        img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
        code: "12453",
        title: "Adhesives, Caulking & Sealants / Adhesive Guns",
        slug: "adhesives-caulking-&-sealants-/-adhesives-guns",
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

const onEnterPressed = () => {};

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");

    const filterItems = (value: string) => {
      const lowerCasedValue = value.toLowerCase();
      const filteredProducts = items.products.results.filter((product) =>
        product.title.toLowerCase().includes(lowerCasedValue),
      );
      const filteredBrands = items.brands.results.filter((brand) =>
        brand.title.toLowerCase().includes(lowerCasedValue),
      );
      const filteredCategories = items.categories.results.filter((category) =>
        category.title.toLowerCase().includes(lowerCasedValue),
      );

      return {
        products: {
          summary: items.products.summary,
          results: filteredProducts,
        },
        brands: { summary: items.brands.summary, results: filteredBrands },
        categories: {
          summary: items.categories.summary,
          results: filteredCategories,
        },
      };
    };

    return (
      <SearchBox>
        <SearchBoxInput
          data={filterItems(value)}
          value={value}
          setValue={setValue}
          placeholder="What are you looking for?"
          onEnterPressed={onEnterPressed}
        />
        {!!value && <SearchClearButton />}
        <SearchBoxButton />
      </SearchBox>
    );
  },
};
