import {
  getPaymentMethods,
  getPlants,
  getShippingMethods,
} from "@/_lib/apis/server";

export const getPaymentMethodName = async (paymentCode: string) => {
  const paymentMethods = await getPaymentMethods();

  const paymentMethod = paymentMethods.find(
    (method) => method.code === paymentCode,
  );

  return paymentMethod?.name ?? "N/A";
};

export const getShippingMethodName = async (shippingCode: string) => {
  const shippingMethods = await getShippingMethods();

  const shippingMethod = shippingMethods.find(
    (method) => method.code === shippingCode,
  );

  return shippingMethod?.name ?? "N/A";
};

export const getPlantName = async (plantCode: string) => {
  const plants = await getPlants();

  const plant = plants.find((plant) => plant.code === plantCode);

  return plant?.name ?? "N/A";
};
