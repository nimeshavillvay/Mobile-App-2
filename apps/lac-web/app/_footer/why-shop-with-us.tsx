import { REASONS } from "./constants";

const WhyShopWithUs = () => {
  return (
    <section className="container space-y-6 pb-3 md:space-y-12 md:pb-9">
      <h2 className="text-center font-title text-3xl font-medium capitalize tracking-[-0.3px] text-black md:text-5xl md:tracking-[-0.576px]">
        Why shop with us?
      </h2>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
        {REASONS.map(({ title, Icon, description }) => (
          <li
            key={title}
            className="space-y-3 rounded-lg bg-sky-50 p-5 md:space-y-5 md:p-6"
          >
            <div className="flex max-w-full flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <div
                className="w-fit rounded p-3 md:rounded-md"
                style={{
                  // TODO Try to convert to a Tailwind CSS class
                  background:
                    "linear-gradient(306deg, #00ADEF 3.23%, #C3CF23 125.64%)",
                }}
              >
                <Icon className="stroke-white md:size-12" />
              </div>

              <h3 className="text-clip break-words font-title text-2xl leading-7 tracking-[-0.12px] text-wurth-blue-450 md:text-[1.75rem] md:leading-8 md:tracking-[-0.14px]">
                {title}
              </h3>
            </div>

            <p className="text-sm font-medium text-black md:text-base">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyShopWithUs;
