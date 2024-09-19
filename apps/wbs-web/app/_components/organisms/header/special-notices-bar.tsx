"use client";

import { cn } from "@/_lib/utils";
import { useLayoutEffect, useRef, useState } from "react";

const SpecialNoticesBar = ({
  noticeText,
  className,
}: {
  readonly noticeText: string;
  readonly className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useLayoutEffect(() => {
    if (containerRef.current && textRef.current) {
      setShouldAnimate(
        textRef.current.offsetWidth > containerRef.current.offsetWidth,
      );
    }
  }, [noticeText]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-9 w-full justify-center overflow-x-hidden bg-brand-tertiary",
        className,
      )}
      data-testid="header-specialNotices"
    >
      <div
        ref={textRef}
        className={`whitespace-nowrap py-1 ${
          shouldAnimate ? "animate-marquee" : ""
        }`}
      >
        <span className="mx-4 text-sm font-medium">{noticeText}</span>
      </div>
      {shouldAnimate ? (
        <div className="absolute animate-marquee2 whitespace-nowrap py-1">
          <span className="mx-4 text-sm font-medium">{noticeText}</span>
        </div>
      ) : null}
    </div>
  );
};

export default SpecialNoticesBar;
