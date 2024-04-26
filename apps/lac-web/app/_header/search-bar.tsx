"use client";

import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
} from "@repo/web-ui/components/search-box";
import { useState } from "react";
import useMultiSearch from "./use-search.hook";

const SearchBar = () => {
  const [value, setValue] = useState("");

  const searchData = useMultiSearch(value);
  console.log('> value: ', value);
  const filterSearchData = (value: string) => {
    const lowerCasedValue = value.toLowerCase();

    const filteredProducts = searchData.data?.products.results.filter(
      (product) => product.title.toLowerCase().includes(lowerCasedValue),
    );
    const filteredBrands = searchData.data?.brands.results.filter((brand) =>
      brand.title.toLowerCase().includes(lowerCasedValue),
    );
    const filteredCategories = searchData.data?.categories.results.filter(
      (category) => category.title.toLowerCase().includes(lowerCasedValue),
    );
    return {
      products: {
        meta: searchData.data?.products.meta,
        results: filteredProducts,
      },
      brands: { meta: searchData.data?.brands.meta, results: filteredBrands },
      categories: {
        meta: searchData.data?.categories.meta,
        results: filteredCategories,
      },
    };
  };
  return (
    <SearchBox>
      <SearchBoxInput
        data={{
          products: {
            meta: {
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
              },
              {
                id: "se902",
                description: "Lev Tolstoy",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "19OZ ADH - ICE WHITE",
              },
              {
                id: "se903",
                description: "Fyodor Dostoyevsky",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "29OZ ADH - ICE WHITE ",
              },
              {
                id: "se901",
                description: "Harper Lee",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "9OZ ADH - ICE WHITE",
              },
              {
                id: "se902",
                description: "Lev Tolstoy",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "19OZ ADH - ICE WHITE",
              },
              {
                id: "se903",
                description: "Fyodor Dostoyevsky",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "29OZ ADH - ICE WHITE",
              },
              {
                id: "se901",
                description: "Harper Lee",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "9OZ ADH - ICE WHITE",
              },
            ],
          },

          brands: {
            meta: {
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
              },
              {
                id: "638884",
                description: "George Orwell",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "Choice Brands Adhesives",
              },
              {
                id: "638885",
                description: "Jane Austen",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "Integra Adhesives",
              },
            ],
          },

          categories: {
            meta: {
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
              },
              {
                id: "6388875",
                description: "George Orwell",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "Adhesives, Caulking & Sealants / Adhesive Hoses",
              },
              {
                id: "6388876",
                description: "Jane Austen",
                img: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png%201x,%20https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
                code: "12453",
                title: "Adhesives, Caulking & Sealants / Adhesive Guns",
              },
            ],
          },
        }}
        value={value}
        setValue={setValue}
        placeholder="What are you looking for?"
      />

      <SearchBoxButton />
    </SearchBox>
  );
};
export default SearchBar;
