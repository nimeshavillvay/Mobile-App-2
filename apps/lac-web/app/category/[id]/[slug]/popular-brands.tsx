import SubHeading from "@/_components/sub-heading";
import Balancer from "react-wrap-balancer";

const PopularBrands = () => {
  return (
    <section className="container my-14 space-y-6 md:my-20">
      <div className="space-y-2 md:space-y-6">
        <SubHeading>Popular Brands</SubHeading>

        <p className="text-center text-base text-black md:pb-6 md:text-lg">
          Lorem ipsum dolor sit amet consectetur. Amet vitae tempus laoreet et
          sit. Venenatis maecenas scelerisque massa arcu sed.
        </p>
      </div>

      <ul className="grid grid-cols-3 justify-between gap-y-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index}>
            <article className="flex flex-col items-center gap-4 md:gap-5">
              <div className="size-28 rounded-full border border-wurth-gray-250 md:size-36" />

              <h3 className="text-center text-[0.9375rem] font-semibold leading-5 text-black md:text-lg md:leading-6">
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
