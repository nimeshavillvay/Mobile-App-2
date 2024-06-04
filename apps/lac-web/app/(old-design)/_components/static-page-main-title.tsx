export const StaticPageMainTitle = (title: string) => {
  return (
    <h1 className="relative overflow-hidden pb-4 font-wurth text-3xl text-brand-primary after:absolute after:top-[calc(50%-0.4rem)] after:block after:h-px after:w-full after:bg-brand-primary after:pl-5">
      <span className="relative z-10 bg-white pr-4">{title}</span>
    </h1>
  );
};
