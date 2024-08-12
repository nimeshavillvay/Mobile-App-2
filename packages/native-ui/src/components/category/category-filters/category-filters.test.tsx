import { cleanup, fireEvent, render, screen } from "~/lib/test-utils";
import {
  CategoryFilterCheckboxItem,
  CategoryFiltersAccordion,
  CategoryFiltersAccordionContent,
  CategoryFiltersAccordionItem,
  CategoryFiltersAccordionTrigger,
  CategoryFiltersScrollView,
} from "./category-filters";

const ATTRIBUTES = [
  {
    id: "1",
    filter: "Filter 1",
    values: [
      {
        id: 1,
        value: "Value 11",
      },
      {
        id: 2,
        value: "Value 12",
      },
    ],
  },
  {
    id: "2",
    filter: "Filter 2",
    values: [
      {
        id: 1,
        value: "Value 21",
      },
      {
        id: 2,
        value: "Value 22",
      },
    ],
  },
] as const;

describe("Category Filters", () => {
  it("displays the categories list with the accordion collapsed by default", () => {
    render(
      <CategoryFiltersScrollView>
        <CategoryFiltersAccordion type="multiple">
          {ATTRIBUTES.map((attribute) => (
            <CategoryFiltersAccordionItem
              key={attribute.id}
              value={attribute.id}
            >
              <CategoryFiltersAccordionTrigger>
                {attribute.filter}
              </CategoryFiltersAccordionTrigger>

              <CategoryFiltersAccordionContent>
                {attribute.values.map((value) => (
                  <CategoryFilterCheckboxItem key={value.id}>
                    {value.value}
                  </CategoryFilterCheckboxItem>
                ))}
              </CategoryFiltersAccordionContent>
            </CategoryFiltersAccordionItem>
          ))}
        </CategoryFiltersAccordion>
      </CategoryFiltersScrollView>,
    );

    expect(screen.getAllByText(/^Filter/)).toHaveLength(2);
    expect(screen.queryAllByText(/^Value/)).toHaveLength(0);
  });

  it("displays the categories list with accordion defined in the 'defaultValue' prop", () => {
    render(
      <CategoryFiltersScrollView>
        <CategoryFiltersAccordion
          type="multiple"
          defaultValue={[ATTRIBUTES[0].id]}
        >
          {ATTRIBUTES.map((attribute) => (
            <CategoryFiltersAccordionItem
              key={attribute.id}
              value={attribute.id}
            >
              <CategoryFiltersAccordionTrigger>
                {attribute.filter}
              </CategoryFiltersAccordionTrigger>

              <CategoryFiltersAccordionContent>
                {attribute.values.map((value) => (
                  <CategoryFilterCheckboxItem key={value.id}>
                    {value.value}
                  </CategoryFilterCheckboxItem>
                ))}
              </CategoryFiltersAccordionContent>
            </CategoryFiltersAccordionItem>
          ))}
        </CategoryFiltersAccordion>
      </CategoryFiltersScrollView>,
    );

    expect(screen.getAllByText(/^Filter/)).toHaveLength(2);
    expect(screen.getAllByText(/^Value 1/)).toHaveLength(2);
    expect(screen.queryAllByText(/^Value 2/)).toHaveLength(0);
  });

  it("opens the accordion item when pressed and shows the checkboxes", async () => {
    render(
      <CategoryFiltersScrollView>
        <CategoryFiltersAccordion type="multiple">
          {ATTRIBUTES.map((attribute) => (
            <CategoryFiltersAccordionItem
              key={attribute.id}
              value={attribute.id}
            >
              <CategoryFiltersAccordionTrigger
                testID={`attribute-trigger-${attribute.id}`}
              >
                {attribute.filter}
              </CategoryFiltersAccordionTrigger>

              <CategoryFiltersAccordionContent>
                {attribute.values.map((value) => (
                  <CategoryFilterCheckboxItem key={value.id}>
                    {value.value}
                  </CategoryFilterCheckboxItem>
                ))}
              </CategoryFiltersAccordionContent>
            </CategoryFiltersAccordionItem>
          ))}
        </CategoryFiltersAccordion>
      </CategoryFiltersScrollView>,
    );

    expect(screen.getAllByText(/^Filter/)).toHaveLength(2);
    expect(screen.queryAllByText(/^Value/)).toHaveLength(0);

    const filterTrigger = screen.getByTestId("attribute-trigger-1");
    fireEvent.press(filterTrigger);

    await screen.findAllByText(/^Value 1/);

    expect(screen.getAllByText(/^Value 1/)).toHaveLength(2);
    expect(screen.queryAllByText(/^Value 2/)).toHaveLength(0);

    cleanup();
  });
});
