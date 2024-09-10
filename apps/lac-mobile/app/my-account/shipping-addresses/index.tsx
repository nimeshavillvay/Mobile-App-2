import useAuthenticatedApiConfig from "@/hooks/config/use-authenticated-api-config.hook";
import { ShippingAddressesList as ShippingAddressesListPrimitive } from "@repo/native-ui/components/account/shipping-addresses-list";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import useSuspenseShippingAddresses from "@repo/shared-logic/apis/hooks/account/use-suspense-shipping-addresses.hook";
import Stack from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Suspense } from "react";
import { Dimensions } from "react-native";

const ShippingAddressesPage = () => {
  const width = Dimensions.get("window").width;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScreenLayout>
        <ScreenHeader title="Shipping Addresses" type="center-aligned" />

        <Suspense
          fallback={
            <MotiView style={{ flex: 1 }}>
              <Skeleton width={width} height="100%" colorMode="light" />
            </MotiView>
          }
        >
          <ShippingAddressesList />
        </Suspense>
      </ScreenLayout>
    </>
  );
};

export default ShippingAddressesPage;

const ShippingAddressesList = () => {
  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const shippingAddressesQuery = useSuspenseShippingAddresses(
    authenticatedApiConfig,
  );

  return <ShippingAddressesListPrimitive data={shippingAddressesQuery.data} />;
};
