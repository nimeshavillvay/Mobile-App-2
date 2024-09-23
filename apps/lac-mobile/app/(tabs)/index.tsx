import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, Input, Text, YStack } from "tamagui";

const HomePage = () => {
  const [input, setInput] = useState("");

  const setToken = useSessionTokenStorage((token) => token.setToken);

  const saveToken = () => {
    setToken(input);
  };

  return (
    <ScreenLayout edges={["top", "right", "left"]}>
      <ScreenHeader title="Home" barcodeScannerPath="/barcode-scanner" />
      <Text>Home Page</Text>

      <YStack gap={4} marginTop={32}>
        <Text>You can add the token from the QA site in this input.</Text>
        <Text>
          This is a temporary workaround to test the cart functionality.
        </Text>

        <Input value={input} onChangeText={setInput} />

        <Button onPress={saveToken}>Save Token</Button>

        <YStack gap={4} margin={10}>
          <Link href="/my-account/profile/edit">Edit Profile</Link>

          <Link href="/my-account/manage-users">Manage Users</Link>

          <Link href="/my-account/shipping-addresses">Shipping Addresses</Link>
        </YStack>
      </YStack>
    </ScreenLayout>
  );
};

export default HomePage;
