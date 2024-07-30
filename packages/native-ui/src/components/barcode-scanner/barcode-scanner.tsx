import { X } from "@tamagui/lucide-icons";
import {
  CameraView,
  useCameraPermissions,
  type CameraProps,
} from "expo-camera";
import { Zap, ZapOff } from "lucide-react-native";
import { createContext, useContext, useId, type ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TextProps } from "tamagui";
import {
  Button,
  H1,
  Text,
  View,
  VisuallyHidden,
  XStack,
  YStack,
} from "tamagui";

const EnableTorchContext = createContext(false);

const useEnableTorchContext = () => {
  return useContext(EnableTorchContext);
};

export const BarcodeScannerRoot = ({
  children,
}: {
  readonly children?: ReactNode;
}) => {
  return children;
};

export const BarcodeScannerLoadingWrapper = ({
  children,
}: {
  readonly children?: ReactNode;
}) => {
  const [permission] = useCameraPermissions();

  if (permission) {
    return null;
  }

  return children;
};

export const BarcodeScannerNoPermission = () => {
  const [permission, requestPermission] = useCameraPermissions();

  if (permission?.granted) {
    return null;
  }

  return (
    <YStack gap="$4">
      <Text>We need your permission to show the camera</Text>
      <Button onPress={requestPermission}>Grant Permission</Button>
    </YStack>
  );
};

export const BarcodeScannerCameraView = ({
  children,
  style,
  enableTorch = false,
  ...delegated
}: Omit<CameraProps, "testID">) => {
  const id = useId();
  const [permission] = useCameraPermissions();

  if (!permission?.granted) {
    return null;
  }

  return (
    <EnableTorchContext.Provider value={enableTorch}>
      <CameraView
        style={StyleSheet.flatten([styles.camera, style])}
        enableTorch={enableTorch}
        testID={`barcode-scanner-camera-view-${id}`}
        {...delegated}
      >
        <SafeAreaView>{children}</SafeAreaView>
      </CameraView>
    </EnableTorchContext.Provider>
  );
};

export const BarcodeScannerHeader = ({
  onClosePress,
  toggleEnableTorch,
}: {
  readonly onClosePress?: () => void;
  readonly toggleEnableTorch: (enableTorch: boolean) => void;
}) => {
  const id = useId();
  const enableTorch = useEnableTorchContext();

  return (
    <XStack justifyContent="space-between" alignItems="center" padding={16}>
      <Button
        icon={<X size="$1.5" color="#ffffff" />}
        circular
        size="$2.5"
        backgroundColor="transparent"
        onPress={onClosePress}
      >
        <VisuallyHidden>Close QR/Barcode scanner</VisuallyHidden>
      </Button>

      <H1 style={styles.heading}>Scan QR or Barcode</H1>

      <Button
        icon={
          enableTorch ? (
            <Zap size={24} color="#ffffff" testID={`torch-on-icon-${id}`} />
          ) : (
            <ZapOff size={24} color="#ffffff" testID={`torch-off-icon-${id}`} />
          )
        }
        circular
        size="$2.5"
        backgroundColor="transparent"
        onPress={() => toggleEnableTorch(!enableTorch)}
      >
        <VisuallyHidden>
          {enableTorch ? "Switch off torch" : "Switch on torch"}
        </VisuallyHidden>
      </Button>
    </XStack>
  );
};

export const BarcodeScannerInstructions = ({
  children = "Focus the device camera on the QR/Barcode at a distance where it can be fully observed.",
  ...delegated
}: TextProps) => {
  return (
    <Text style={styles.description} {...delegated}>
      {children}
    </Text>
  );
};

export const BarcodeScannerScanArea = () => {
  return (
    <YStack
      width={353}
      height={322}
      marginHorizontal="auto"
      justifyContent="space-between"
    >
      <XStack alignItems="center" justifyContent="space-between">
        <View
          style={styles.scanAreaCorner}
          borderTopWidth="$0.75"
          borderLeftWidth="$0.75"
        />

        <View
          style={styles.scanAreaCorner}
          borderTopWidth="$0.75"
          borderRightWidth="$0.75"
        />
      </XStack>

      <Text color="#ffffff" textAlign="center">
        Scanning...
      </Text>

      <XStack alignItems="center" justifyContent="space-between">
        <View
          style={styles.scanAreaCorner}
          borderBottomWidth="$0.75"
          borderLeftWidth="$0.75"
        />

        <View
          style={styles.scanAreaCorner}
          borderBottomWidth="$0.75"
          borderRightWidth="$0.75"
        />
      </XStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  camera: { flex: 1, width: "100%" },
  heading: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 25,
  },
  description: {
    marginVertical: 46,
    marginHorizontal: 65,
    padding: 10,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 16,
  },
  scanAreaCorner: {
    width: 32,
    height: 32,
    borderColor: "#ffffff",
  },
});
