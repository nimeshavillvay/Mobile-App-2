import { GoogleTagManager } from "@next/third-parties/google";
import { type ReactNode } from "react";

type RootTemplateProps = {
  readonly children: ReactNode;
};

const RootTemplate = ({ children }: RootTemplateProps) => {
  return (
    <>
      {!!process.env.NEXT_PUBLIC_WURTH_LAC_GTM_KEY && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_WURTH_LAC_GTM_KEY} />
      )}

      {children}
    </>
  );
};

export default RootTemplate;
