import { Profile } from "@repo/web-ui/components/icons/profile";

type ButtonContentProps = {
  text: string;
};

const ButtonContent = ({ text }: ButtonContentProps) => {
  return (
    <>
      <Profile className="md:size-7" />

      <span className="sr-only md:not-sr-only md:text-base md:font-semibold">
        {text}
      </span>
    </>
  );
};

export default ButtonContent;
