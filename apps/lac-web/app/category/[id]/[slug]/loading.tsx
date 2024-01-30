import { PAGE_SIZES } from "./constants";
import ProductsListSelectors from "./products-list-selectors";

const CategoryLoading = () => {
  return (
    <>
      <ProductsListSelectors />

      {[...Array(parseInt(PAGE_SIZES[0]))].map((item, index) => (
        <div key={index}>Placeholder Product</div>
      ))}
    </>
  );
};

export default CategoryLoading;
