import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import CheckBox from "@react-native-community/checkbox";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import useFilters from "@repo/shared-logic/apis/hooks/search/use-filters.hook";
import { ChevronDown } from "@tamagui/lucide-icons";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import Stack from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import {
  Accordion,
  Button,
  Paragraph,
  ScrollView,
  Square,
  Text,
  XStack,
} from "tamagui";

const CategoryFiltersPage = () => {
  const localSearchParams = useLocalSearchParams();
  const globalSearchParams = useGlobalSearchParams();
  const id = localSearchParams.id?.toString();

  const [selectedValues, setSelectedValues] = useState(() => {
    const selectedValues: Record<string, string[]> = {};

    for (const attributeId in globalSearchParams) {
      if (attributeId !== "id") {
        const values = globalSearchParams[attributeId];

        if (values) {
          if (Array.isArray(values)) {
            selectedValues[attributeId] = values;
          } else {
            selectedValues[attributeId] = [values];
          }
        }
      }
    }

    return selectedValues;
  });

  const applyFilters = () => {
    let newSearchParams = "";

    for (const attributeId in selectedValues) {
      const values = selectedValues[attributeId];

      if (values) {
        if (newSearchParams) {
          newSearchParams = newSearchParams + "&";
        }
        newSearchParams =
          newSearchParams + attributeId + "=" + values.toString();
      }
    }

    router.push(`/category/${id}?${newSearchParams.toString()}`);
  };

  if (!id) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScreenLayout>
        <ScreenHeader title="Filters" hideSearchButton type="center-aligned" />

        <AttributesList
          id={id}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />

        <XStack
          paddingTop={12}
          paddingBottom={17}
          paddingHorizontal={16}
          alignItems="center"
          justifyContent="space-between"
          gap={10}
        >
          <Button
            style={styles.footerButton}
            color="#171717"
            backgroundColor="white"
            borderColor="#E2E2E2"
            onPress={() => setSelectedValues({})}
          >
            Clear Filters
          </Button>

          <Button
            style={StyleSheet.flatten([
              styles.footerButton,
              { color: "#EDEDED", backgroundColor: "#282828" },
            ])}
            onPress={applyFilters}
          >
            Apply Filters
          </Button>
        </XStack>
      </ScreenLayout>
    </>
  );
};

export default CategoryFiltersPage;

const styles = StyleSheet.create({
  attributesList: {
    backgroundColor: "#F7F8FA",
    padding: 16,
  },
  attributeItem: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
  },
  attributeTrigger: {
    paddingHorizontal: 18,
    paddingVertical: 23,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0,
  },
  attributeContent: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 16,
  },
  valueLabel: {
    color: "#171717",
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
    height: 20,
  },
  footerButton: {
    flex: 1,
    height: 44,
    borderRadius: 9,
    fontSize: 16,
  },
});

const AttributesList = ({
  id,
  selectedValues,
  setSelectedValues,
}: {
  readonly id: string;
  readonly selectedValues: Record<string, string[]>;
  readonly setSelectedValues: (
    selectedValues: Record<string, string[]>,
  ) => void;
}) => {
  const token = useSessionTokenStorage((state) => state.token);

  const isChecked = (attributeId: string, valueId: string) => {
    return !!selectedValues[attributeId]?.includes(valueId);
  };
  const toggleCheck = (
    checked: boolean,
    attributeId: string,
    valueId: string,
  ) => {
    if (checked) {
      const values = selectedValues[attributeId];

      if (values) {
        // If more values already exist, just append
        setSelectedValues({
          ...selectedValues,
          [attributeId]: [...values, valueId],
        });
      } else {
        // If no other values for the attribute exists, create a new array
        setSelectedValues({
          ...selectedValues,
          [attributeId]: [valueId],
        });
      }
    } else {
      const newSelectedValues = { ...selectedValues };
      const values = newSelectedValues[attributeId];

      if (values) {
        if (values.length > 1) {
          newSelectedValues[attributeId] = values.filter(
            (value) => value !== valueId,
          );
        } else {
          delete newSelectedValues[attributeId];
        }

        setSelectedValues(newSelectedValues);
      }
    }
  };

  const { data } = useFilters(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    {
      type: "Categories",
      id,
      values: selectedValues,
    },
    true,
  );

  if (!data) {
    return (
      <MotiView style={{ padding: 16, flex: 1, backgroundColor: "#F7F8FA" }}>
        <Skeleton height="100%" width="100%" colorMode="light" />
      </MotiView>
    );
  }

  return (
    <ScrollView style={styles.attributesList}>
      <Accordion type="multiple" defaultValue={Object.keys(selectedValues)}>
        {data.map((attribute) => (
          <Accordion.Item
            key={attribute.id}
            value={attribute.id}
            style={styles.attributeItem}
          >
            <Accordion.Trigger style={styles.attributeTrigger}>
              {({ open }: { readonly open: boolean }) => (
                <>
                  <Paragraph fontSize={18}>{attribute.filter}</Paragraph>

                  <Square
                    animation="quick"
                    rotate={open ? "180deg" : "0deg"}
                    size={20}
                  >
                    <ChevronDown size={20} />
                  </Square>
                </>
              )}
            </Accordion.Trigger>

            <Accordion.Content style={styles.attributeContent}>
              {attribute.values.map((value) => (
                <XStack key={value.id} alignItems="center" gap={10}>
                  <CheckBox
                    value={isChecked(attribute.id, value.id.toString())}
                    onValueChange={(checked) => {
                      if (checked) {
                        toggleCheck(true, attribute.id, value.id.toString());
                      } else {
                        toggleCheck(false, attribute.id, value.id.toString());
                      }
                    }}
                    disabled={!value.active}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    boxType="square"
                    tintColor="#E2E2E2"
                    tintColors={{
                      true: "#E2E2E2",
                      false: "#E2E2E2",
                    }}
                    onTintColor="#E2E2E2"
                    onCheckColor="#171717"
                    animationDuration={0.15}
                  />

                  <Pressable
                    disabled={!value.active}
                    onPress={() => {
                      const checked = isChecked(
                        attribute.id,
                        value.id.toString(),
                      );

                      if (!checked) {
                        toggleCheck(true, attribute.id, value.id.toString());
                      } else {
                        toggleCheck(false, attribute.id, value.id.toString());
                      }
                    }}
                  >
                    <Text style={styles.valueLabel}>{value.value}</Text>
                  </Pressable>
                </XStack>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScrollView>
  );
};
