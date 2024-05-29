import { Plant } from "@/_lib/types";

type PlantNameProps = {
  plants: Plant[];
  plantCode?: string;
};

const PlantName = ({ plants, plantCode }: PlantNameProps) => {
  if (!!plantCode) {
    const foundPlant = plants.find((plant) => plant.code === plantCode);

    return <>{foundPlant?.name ?? "Plant N/A"}</>;
  }

  return <>Plant N/A</>;
};

export default PlantName;
