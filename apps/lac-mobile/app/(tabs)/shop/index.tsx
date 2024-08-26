import { API_BASE_URL, API_KEY } from "@/lib/constants";
import {
  BannersCarousel,
  BannersCarouselItem,
  BannersCarouselSkeleton,
} from "@repo/native-ui/components/banners";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import {
  FeaturedCategoriesContainer,
  FeaturedCategoriesHeader,
  FeaturedCategoriesList,
  FeaturedCategoriesSkeleton,
} from "@repo/native-ui/components/category/featured-categories";
import useSuspenseBanners from "@repo/shared-logic/apis/hooks/banners/use-suspense-banners.hook";
import useSuspenseFeaturedCategories from "@repo/shared-logic/apis/hooks/category/use-suspense-featured-categories.hook";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Suspense } from "react";
import { Dimensions, Platform } from "react-native";

const ShopPage = () => {
  return (
    <ScreenLayout edges={["top", "right", "left"]}>
      <ScreenHeader
        title="Explore Products"
        hideBackButton
        barcodeScannerPath="/barcode-scanner"
      />

      <Suspense fallback={<BannersCarouselSkeleton />}>
        <Banners />
      </Suspense>

      <Suspense fallback={<FeaturedCategoriesSkeleton />}>
        <FeaturedCategories />
      </Suspense>
    </ScreenLayout>
  );
};

export default ShopPage;

const Banners = () => {
  const { data } = useSuspenseBanners({
    baseUrl: API_BASE_URL,
    apiKey: API_KEY,
  });

  const topBanners = data.T[0]?.banners;

  if (!topBanners) {
    return null;
  }

  const width = Dimensions.get("window").width;
  const imageWidth = width - 16 * 2; // Accounting for the horizontal padding
  const imageHeight = imageWidth / 2;

  const downloadBannerFile = async (filePath: string, fileName: string) => {
    const downloadedFile = await FileSystem.downloadAsync(
      filePath,
      `${FileSystem.documentDirectory}${fileName}`,
    );

    if (Platform.OS === "ios") {
      await Sharing.shareAsync(downloadedFile.uri, { UTI: "public.item" });
    } else if (Platform.OS === "android") {
      // The code to save in Android is from
      // https://www.youtube.com/watch?v=HkIKDqzI3sQ
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(downloadedFile.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const uri = await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "application/pdf",
        );

        await FileSystem.writeAsStringAsync(uri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } else {
        await Sharing.shareAsync(downloadedFile.uri, { UTI: "public.item" });
      }
    }
  };

  return (
    <BannersCarousel
      width={width}
      height={width / 2.5}
      data={topBanners}
      renderItem={({ item }) => (
        <BannersCarouselItem
          image={item.file_path}
          alt={item.alt_tag}
          width={imageWidth}
          height={imageHeight}
          onPress={() => {
            downloadBannerFile(item.pdf_file_path, item.pdf_file_name);
          }}
        />
      )}
    />
  );
};

const FeaturedCategories = () => {
  const { data } = useSuspenseFeaturedCategories({
    baseUrl: API_BASE_URL,
    apiKey: API_KEY,
  });

  const filteredCategories = data.slice(0, 7); // Should be limited to 7 categories

  return (
    <FeaturedCategoriesContainer>
      <FeaturedCategoriesHeader />

      <FeaturedCategoriesList data={filteredCategories} scrollEnabled={false} />
    </FeaturedCategoriesContainer>
  );
};
