export type FilterSection = {
  id: string;
  heading: string;
  values: {
    id: string;
    name: string;
    isActive: boolean;
  }[];
};
