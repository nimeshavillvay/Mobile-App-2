import { type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import type { ComponentProps, ComponentType, ReactNode } from "react";
import React from "react";
import { cva } from "~/lib/cva.config";
import { cn } from "~/lib/utils";
import { usePrevNextButtons } from "./next-prev-button";

const carouselVariants = cva({
  base: "flex items-center",
  variants: {
    orientation: {
      horizontal: "flex",
      vertical: "h-[35rem] flex-col",
    },
    buttonsPosition: {
      top: "flex-col",
      bottom: "flex-col-reverse",
      side: "flex",
    },
    buttonSize: {
      desktop: "size-9 pl-2",
      mobile: "size-5 pl-1",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    buttonsPosition: "side",
  },
});

export const Carousel = ({ children }: { readonly children: ReactNode[] }) => {
  let header: React.ReactNode = null;
  const content: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }
    if (child.type === CarouselHeader) {
      header = child;
    } else if (child.type === CarouselContent) {
      content.push(child);
    }
  });

  return (
    <section>
      {!!header && <header>{header}</header>}
      {!!content && <header>{content}</header>}
    </section>
  );
};

export const CarouselHeader: React.FC<{
  readonly children: React.ReactNode;
  readonly className?: string;
}> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const CarouselContent = ({
  options,
  children,
  PrevIcon,
  NextIcon,
  className,
  orientation = "horizontal",
  buttonsPosition = "side",
  buttonSize = "desktop",
}: ComponentProps<"div"> & {
  readonly options: EmblaOptionsType;
  readonly children: ReactNode[];
  readonly PrevIcon: ComponentType<ComponentProps<"svg">>;
  readonly NextIcon: ComponentType<ComponentProps<"svg">>;
  readonly orientation?: "horizontal" | "vertical";
  readonly buttonsPosition?: "top" | "bottom" | "side";
  readonly buttonSize?: "desktop" | "mobile";
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={carouselVariants({ orientation, buttonsPosition })}>
      {PrevIcon ? (
        <button
          aria-label="previous"
          hidden={prevBtnDisabled}
          onClick={onPrevButtonClick}
        >
          <PrevIcon className={carouselVariants({ buttonSize })} />
        </button>
      ) : null}

      <div className={cn("overflow-hidden", className)} ref={emblaRef}>
        <div className={carouselVariants({ orientation })}>{children}</div>
      </div>
      {NextIcon ? (
        <button
          aria-label="next"
          onClick={onNextButtonClick}
          hidden={nextBtnDisabled}
        >
          <NextIcon className={carouselVariants({ buttonSize })} />
        </button>
      ) : null}
    </div>
  );
};
