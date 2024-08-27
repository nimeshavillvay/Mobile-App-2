import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import {
  CategoryFilterCheckboxItem,
  CategoryFilterFooter,
  CategoryFiltersAccordion,
  CategoryFiltersAccordionContent,
  CategoryFiltersAccordionItem,
  CategoryFiltersAccordionTrigger,
  CategoryFiltersScrollView,
  CategoryFiltersSkeleton,
} from "@repo/native-ui/components/category/category-filters";
import useFilters from "@repo/shared-logic/apis/hooks/search/use-filters.hook";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import Stack from "expo-router/stack";
import { useState } from "react";

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

    router.push(`/shop/category/${id}?${newSearchParams.toString()}`);
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

      <ScreenLayout edges={["left", "top", "right"]}>
        <ScreenHeader title="Filters" hideSearchButton type="center-aligned" />

        <AttributesList
          id={id}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />

        <CategoryFilterFooter
          onClearPress={() => setSelectedValues({})}
          onApplyPress={applyFilters}
        />
      </ScreenLayout>
    </>
  );
};

export default CategoryFiltersPage;

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
    return <CategoryFiltersSkeleton />;
  }

  return (
    <CategoryFiltersScrollView>
      <CategoryFiltersAccordion
        type="multiple"
        defaultValue={Object.keys(selectedValues)}
      >
        {data.map((attribute) => (
          <CategoryFiltersAccordionItem key={attribute.id} value={attribute.id}>
            <CategoryFiltersAccordionTrigger>
              {attribute.filter}
            </CategoryFiltersAccordionTrigger>

            <CategoryFiltersAccordionContent>
              {attribute.values.map((value) => (
                <CategoryFilterCheckboxItem
                  key={value.id}
                  checked={isChecked(attribute.id, value.id.toString())}
                  onCheckedChanged={(checked) => {
                    if (checked) {
                      toggleCheck(true, attribute.id, value.id.toString());
                    } else {
                      toggleCheck(false, attribute.id, value.id.toString());
                    }
                  }}
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
                  {value.value}
                </CategoryFilterCheckboxItem>
              ))}
            </CategoryFiltersAccordionContent>
          </CategoryFiltersAccordionItem>
        ))}
      </CategoryFiltersAccordion>
    </CategoryFiltersScrollView>
  );
};
