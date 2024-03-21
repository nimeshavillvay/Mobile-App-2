import { type ReactNode } from "react";
import Balancer from "react-wrap-balancer";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-center font-title text-3xl font-medium tracking-[-0.01875rem] text-black">
      <Balancer>{children}</Balancer>
    </h2>
  );
};

export default Title;
