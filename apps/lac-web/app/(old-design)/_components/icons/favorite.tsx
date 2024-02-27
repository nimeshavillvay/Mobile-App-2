import { type ComponentProps } from "react";

const FavoriteIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="19"
      fill="none"
      viewBox="0 0 21 19"
      {...props}
    >
      <path
        fill="#55a213"
        d="M15.225 0c-1.827 0-3.58.839-4.725 2.164A6.324 6.324 0 005.775 0C2.541 0 0 2.506 0 5.695c0 3.914 3.57 7.103 8.977 11.949L10.5 19l1.523-1.367C17.43 12.798 21 9.61 21 5.695 21 2.505 18.459 0 15.225 0z"
      />
    </svg>
  );
};

export default FavoriteIcon;
