import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";

const AttributesSelector = () => {
  return (
    <aside className="w-[14.75rem] space-y-1">
      <h4 className="px-3 text-sm text-wurth-gray-800">Filters</h4>

      <Accordion type="single" className="space-y-1">
        <AccordionItem value="Brands">
          <AccordionTrigger>
            <span className="flex-1 text-left">Brands</span>

            <span className="grid size-5 place-items-center rounded-full bg-black text-xs font-semibold leading-none text-white">
              2
            </span>
          </AccordionTrigger>

          <AccordionContent>Brands</AccordionContent>
        </AccordionItem>

        <AccordionItem value="Shape">
          <AccordionTrigger>Shape</AccordionTrigger>

          <AccordionContent>Shape</AccordionContent>
        </AccordionItem>

        <AccordionItem value="Product Type">
          <AccordionTrigger>Product Type</AccordionTrigger>

          <AccordionContent>Product Type</AccordionContent>
        </AccordionItem>

        <AccordionItem value="Finish">
          <AccordionTrigger>Finish</AccordionTrigger>

          <AccordionContent>Finish</AccordionContent>
        </AccordionItem>

        <AccordionItem value="Wood Species">
          <AccordionTrigger>Wood Species</AccordionTrigger>

          <AccordionContent>Wood Species</AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default AttributesSelector;
