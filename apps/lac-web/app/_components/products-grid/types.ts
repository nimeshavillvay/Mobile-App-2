export type Filter = {
  id: string;
  title: string;
  values: {
    id: string;
    value: string;
    active: boolean;
  }[];
};
