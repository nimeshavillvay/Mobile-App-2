import { type ComponentProps } from "react";

const AddToFavoritesIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
      {...props}
    >
      <path
        fill="#00ADEF"
        d="M11.5 21l-3.175-2.85a92.776 92.776 0 01-3.087-2.9c-.859-.85-1.567-1.65-2.125-2.4-.559-.75-.967-1.475-1.225-2.175a6.296 6.296 0 01-.388-2.2c0-1.567.525-2.871 1.575-3.913C4.125 3.521 5.433 3 7 3c.867 0 1.692.183 2.475.55A5.93 5.93 0 0111.5 5.1a5.93 5.93 0 012.025-1.55A5.769 5.769 0 0116 3c1.35 0 2.483.379 3.4 1.137A5.69 5.69 0 0121.275 7H19.15c-.3-.667-.742-1.167-1.325-1.5A3.628 3.628 0 0016 5c-.85 0-1.583.23-2.2.688-.617.458-1.192 1.062-1.725 1.812h-1.15c-.517-.75-1.104-1.354-1.762-1.812A3.705 3.705 0 007 5c-.95 0-1.771.329-2.463.987C3.846 6.646 3.5 7.475 3.5 8.475c0 .55.117 1.108.35 1.675.233.567.65 1.221 1.25 1.963.6.741 1.417 1.608 2.45 2.599 1.033.992 2.35 2.188 3.95 3.588.433-.383.942-.825 1.525-1.325s1.05-.917 1.4-1.25l.225.225.487.488.488.487.225.225c-.367.333-.833.746-1.4 1.237-.567.492-1.067.93-1.5 1.313L11.5 21zm7-4v-3h-3v-2h3V9h2v3h3v2h-3v3h-2z"
      />
    </svg>
  );
};

export default AddToFavoritesIcon;