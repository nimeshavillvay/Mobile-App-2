import SubHeading from "@/_components/sub-heading";
import Balancer from "react-wrap-balancer";

const PopularBrands = () => {
  return (
    <section className="container my-14 md:my-20 space-y-6">
      <div className="space-y-2 md:space-y-6">
        <SubHeading>Popular Brands</SubHeading>

        <p className="text-base text-black text-center md:pb-6 md:text-lg">
          Lorem ipsum dolor sit amet consectetur. Amet vitae tempus laoreet et
          sit. Venenatis maecenas scelerisque massa arcu sed.
        </p>
      </div>

      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-y-10 justify-between">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index}>
            <article className="flex flex-col items-center gap-4 md:gap-5">
              <div className="size-28 md:size-36 border border-wurth-gray-250 rounded-full" />

              <h3 className="text-center text-[0.9375rem] leading-5 md:text-lg md:leading-6 font-semibold text-black">
                <Balancer>Amerock</Balancer>
              </h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularBrands;
