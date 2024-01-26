"use client";

import * as RadixVisuallyHidden from "@radix-ui/react-visually-hidden";
import { type ComponentProps } from "react";

const VisuallyHidden = (
  props: ComponentProps<typeof RadixVisuallyHidden.Root>,
) => {
  return <RadixVisuallyHidden.Root {...props} />;
};

export default VisuallyHidden;
