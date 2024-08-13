"use client";

import useLaminateFilter from "@/_hooks/product/use-laminate-item-info.hook";
import type { Product } from "@/_lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import Image from "next/image";
import LaminateEdgeBandingRow from "./laminate-edgebanding-row";

const LaminateEdgeBanding = ({
  product,
  token,
  groupId,
}: {
  readonly groupId: string;
  readonly product: Product;
  readonly token: string;
}) => {
  const { data: laminateData } = useLaminateFilter(
    Number(product.variants[0]?.id),
  );

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="pb-2 text-xl font-semibold">Matching Edgebanding</h4>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            3D Edgebanding, Color 3D700R Brushed Aluminum, 2mm Thick 15/16
            inch(need to get from api)
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-4 flex gap-4">
              <Image
                src={product.groupImage}
                alt={product.groupName}
                width={132}
                height={132}
              />
              <div>
                <Image
                  src={product.groupImage}
                  alt={product.groupName}
                  width={76}
                  height={76}
                />
                <div className="mt-2">
                  <div className="flex gap-4">
                    <p className="w-24 text-gray-600">Brand:</p>
                    <p className="font-semibold">Dollken Woodtape</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="w-24 text-gray-600">Product Type:</p>
                    <p className="font-semibold">Dollken Woodtape</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="w-24 text-gray-600">Thickness:</p>
                    <p className="font-semibold">Dollken Woodtape</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="w-full min-w-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item # and MFR Part #</TableHead>
                      <TableHead className="text-center lg:w-1/4">
                        Price
                      </TableHead>
                      <TableHead className="text-center lg:w-1/6">
                        QTY
                      </TableHead>
                      <TableHead className="text-right font-medium">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {laminateData?.edgebanding.map((item, index) => (
                      <LaminateEdgeBandingRow
                        key={index}
                        product={item}
                        token={token}
                        groupId={groupId}
                        quantityFieldIndex={index}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end gap-4 rounded bg-gray-50 p-4">
                <div>
                  <span className="text-wurth-gray-600">Total:</span>{" "}
                  <strong className="text-lg">$456.00</strong>
                </div>
                <Button>Add to cart</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LaminateEdgeBanding;
