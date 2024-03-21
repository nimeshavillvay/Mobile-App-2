import {
  ProductCard,
  ProductCardCompare,
  ProductCardContent,
  ProductCardDetails,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
} from "@repo/web-ui/components/product-card";
import Image from "next/image";
import productImage from "./product-image.png";
import productItemImage from "./product-item-image.png";

const FeaturedBrand = () => {
  return (
    <section
      style={{
        // TODO Try to convert to a Tailwind CSS class
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), #F37021",
      }}
      className="my-14 space-y-6 py-9"
    >
      <div className="mx-4 overflow-hidden rounded-lg bg-[#F37021] shadow-lg xs:mx-8">
        <Image
          src={productImage}
          alt="A placeholder image"
          height={380}
          width={680}
          className="object-contain"
        />

        <div className="p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="118"
            height="32"
            fill="none"
            viewBox="0 0 80 21"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M76.853 1.254A1.505 1.505 0 0178.296.196c.822 0 1.504.666 1.504 1.47 0 .803-.682 1.47-1.504 1.47s-1.523-.647-1.523-1.47c0-.157.02-.275.08-.412zm0-.02v.02l-.18-.078c-.04.156-.08.313-.08.49 0 .92.761 1.646 1.703 1.646.942 0 1.704-.745 1.704-1.646C80 .764 79.238 0 78.296 0c-.762 0-1.403.49-1.624 1.156l.18.078zm-53.06 19.203h6.054L36.903 1h-6.094l-7.015 19.438zM7.338 12.658l-.762-6.035a.766.766 0 00-.521-.627.785.785 0 00-.802.176l-4.47 4.233s-.18.196-.22.313c-.141.412.08.843.48.98.08.04.18.04.26.04h1.544c.14.039.2.195.16.313l-.24.686L0 20.398h.561l2.947-8.151v-.02a.768.768 0 00-.481-.98c-.08-.039-.18-.039-.26-.039H1.222c-.14-.039-.2-.196-.16-.313 0-.04.04-.079.08-.098l.52-.51 3.368-3.213.582-.549s.16-.078.26-.059c0 0 .16.118.16.196l.1.784.582 4.566.08.705v.118c-.04.137-.2.196-.34.156-.02 0-.06-.02-.08-.039l-.301-.235-.281-.216-.541-.43s-.14-.098-.24-.138a.795.795 0 00-1.003.47v.02l-2.886 7.975h.56l2.587-7.132.24-.686c.04-.137.2-.196.34-.157.021 0 .061.02.081.04l.581.47.562.45s.14.098.22.118a.795.795 0 001.002-.47.876.876 0 00.04-.392v.02zm40.718 7.76h-.027l.02.02.007-.02zm0 0h5.987l3.147-8.543c1.263-2.058 3.768-1.588 3.307.215l-3.007 8.348h6.275l2.966-8.152c.802-2.057 4.09-2.175 3.368.235l-2.807 7.916h6.054l3.388-9.386c1.122-3.193-2.867-7.465-9.722-2.762-.822-2.156-4.21-3.488-8.72-.373l.3-1.273H52.96l-4.904 13.775zm29.88-18.792H78.577c.24 0 .38-.411.06-.49h-.702v.49zm.481.177h-.42v.02h-.08v.666h-.161V.96h.822c.42-.02.601.608.16.804.207.106.2.285.193.449-.004.106-.008.206.048.276h-.18c-.04-.052-.039-.134-.037-.225.003-.187.006-.408-.345-.461zm-36.542 4.82h-.007l.007-.02v.02zm-.007 0h-5.686l-3.347 9.17c-1.664 5.174 3.668 6.898 8.74 3.312l-.341 1.313h5.432l4.991-13.795h-5.793L42.897 14.5c-.682 1.92-4.55 2.998-3.95.059l2.92-7.936zM18.983.96l-2.265 6.388h.02c7.497-4.37 11.265 1.568 7.958 7.544-4.21 8.289-12.068 6.33-12.428 3.997l-.662 1.529H5.893L12.89.96h6.094zm-4.19 15.167c1.063.685 2.867 0 3.99-1.372 1.182-1.45 1.382-3.586.22-4.33-.983-.628-2.205-.314-3.268.666-.32.274-.601.627-.882 1.019-1.122 1.606-1.182 3.272-.06 4.017z"
              clipRule="evenodd"
            ></path>
          </svg>

          <h2 className="mb-2 mt-4 font-title text-3xl font-medium tracking-[-0.01406rem] text-white">
            moving ideas
          </h2>

          <p className="text-base text-white">
            Ultimate functionality is the heart of Blum’s products. Find the
            perfect hinges, lift systems, drawer runners and box systems to
            bring your cabinet ideas to life.
          </p>
        </div>
      </div>

      <div className="container flex w-full max-w-full snap-x scroll-pl-4 flex-row gap-4 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <ProductCard key={index} className="shrink-0 snap-start">
            <ProductCardHero>
              <ProductCardImage
                src={productItemImage}
                alt="A placeholder product"
                href={"/product/12345"}
                title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
              />

              <ProductCardLabel>Label</ProductCardLabel>

              <ProductCardCompare />
            </ProductCardHero>

            <ProductCardContent>
              <ProductCardDetails
                title='Pro 128mm Mod Bar Pull, Satin Champagne, 5-11/16" Length'
                sku="PROMD8-SCP"
                href="/product/771770/PROMD3-MB"
              />

              <ProductCardPrice price={2.05} uom="pair" />
            </ProductCardContent>
          </ProductCard>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrand;
