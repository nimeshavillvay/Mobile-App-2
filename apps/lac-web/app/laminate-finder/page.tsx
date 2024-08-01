import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridFiltersSkeleton,
  ProductsGridHeaderSkeleton,
  ProductsGridListSkeleton,
  ProductsGridPaginationSkeleton,
} from "@/_components/products-grid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { Input } from "@repo/web-ui/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import Image from "next/image";
import { Suspense } from "react";
import LaminatesList from "./laminates-list";

const Page = () => {
  return (
    <>
      <div className="md mx-width container mb-10">
        <div className="py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Laminate Finder</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="line-clamp-3 text-balance font-title text-4xl font-medium tracking-tight text-wurth-gray-800 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.036rem]">
          Laminate Finder
        </h1>
        <div className="mt-4 flex gap-10">
          <aside className="w-[236px] shrink-0">
            Side filters Lorem ipsum dolor sit amet consectetur 5x4 grid = 20
            items colours = 16 chips
          </aside>
          <section className="grow">
            <div>
              <p>Select colors</p>
              <ul className="my-2 flex flex-row flex-wrap gap-4">
                <li>
                  <input type="checkbox" id="colorWhite" name="colorWhite" />
                  <label for="colorWhite">White</label>
                  <span>#fcfcfc</span>
                </li>
                <li>
                  <label for="colorNatural">
                    <input
                      type="checkbox"
                      id="colorNatural"
                      name="colorNatural"
                    />{" "}
                    Natural
                  </label>
                  <span>#dbd0c6</span>
                </li>
                <li>
                  <input type="checkbox" id="colorTaupe" name="colorTaupe" />
                  <label for="colorTaupe">Taupe</label>
                  <span>#c0b398</span>
                </li>
                <li>
                  <input type="checkbox" id="colorSilver" name="colorSilver" />
                  <label for="colorSilver">Silver</label>
                  <span>#c7cac7</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <Image
                  src="https://wurthlac.com/api/pim/Product-Assets/Images/300x300/105-FeatherGray.jpg"
                  alt=""
                  width={203}
                  height={203}
                />
                <h5 className="font-medium">969-58 Navy Blue</h5>
              </div>
              <div>
                <Image
                  src="https://wurthlac.com/api/pim/Product-Assets/Images/300x300/105-FeatherGray.jpg"
                  alt=""
                  width={203}
                  height={203}
                />
                <h5 className="font-medium">969-58 Navy Blue</h5>
              </div>
              <div>
                <Image
                  src="https://wurthlac.com/api/pim/Product-Assets/Images/300x300/105-FeatherGray.jpg"
                  alt=""
                  width={203}
                  height={203}
                />
                <h5 className="font-medium">969-58 Navy Blue</h5>
              </div>
              <div>
                <Image
                  src="https://wurthlac.com/api/pim/Product-Assets/Images/300x300/105-FeatherGray.jpg"
                  alt=""
                  width={203}
                  height={203}
                />
                <h5 className="font-medium">969-58 Navy Blue</h5>
              </div>
              <div>
                <Image
                  src="https://wurthlac.com/api/pim/Product-Assets/Images/300x300/105-FeatherGray.jpg"
                  alt=""
                  width={203}
                  height={203}
                />
                <h5 className="font-medium">969-58 Navy Blue</h5>
              </div>
              <div>
                <Image
                  src="https://wurthlac.com/api/pim/Product-Assets/Images/300x300/105-FeatherGray.jpg"
                  alt=""
                  width={203}
                  height={203}
                />
                <h5 className="font-medium">969-58 Navy Blue</h5>
              </div>
              <div>
                <Image
                  src="https://wurthlac.com/api/pim/Product-Assets/Images/300x300/105-FeatherGray.jpg"
                  alt=""
                  width={203}
                  height={203}
                />
                <h5 className="font-medium">969-58 Navy Blue</h5>
              </div>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        </div>
      </div>

      <div>
        {/* <SubCategoriesList categories={subCategories} /> */}

        <Suspense
          fallback={
            <ProductsGrid>
              <ProductsGridHeaderSkeleton />

              <ProductsGridDesktopContainer>
                <ProductsGridFiltersSkeleton />

                <ProductsGridListSkeleton type="desktop" />
              </ProductsGridDesktopContainer>

              <ProductsGridPaginationSkeleton />
            </ProductsGrid>
          }
        >
          <LaminatesList />
        </Suspense>
      </div>

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">open modal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[52rem]">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex w-full gap-4 lg:w-60 lg:flex-col">
                <div>
                  <Image
                    src="https://wurthlac.com/api/pim//Brand%20Logos/Greenlam.png"
                    alt=""
                    width={44}
                    height={44}
                  />
                  <h3 className="mt-2 text-xl font-bold">105 Feather Gray</h3>
                  <p className="mb-2">$0.663 / SqFoot</p>
                </div>
                <div>
                  <Image
                    src="https://wurthlac.com/api/pim/Product-Assets/Images/300x300/105-FeatherGray.jpg"
                    alt=""
                    width={240}
                    height={240}
                  />
                </div>
                <div className="mt-2 text-sm text-wurth-gray-500">
                  <strong>Note:</strong>
                  <p className="mb-2">
                    Image color is for reference only. Actual colors may vary
                    due to monitor settings.
                  </p>
                  <p>To obtain a sample, please contact your local branch.</p>
                </div>
              </div>
              <div className="grow">
                <h4 className="text-lg font-semibold">Laminate details</h4>
                <p className="mb-2 text-wurth-gray-800">
                  Please select a <strong>Grade</strong> and{" "}
                  <strong>Finish</strong> to show items.
                </p>
                <div className="mb-4 flex gap-1">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Finish" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-40">Size</TableHead>
                      <TableHead>Stock/EA</TableHead>
                      {/* <TableHead className="text-center">
                        Alt Branch
                        <br />
                        <span className="text-xs">(Stock)</span>
                      </TableHead> */}
                      <TableHead className="text-center">QTY</TableHead>
                      <TableHead className="text-right font-medium">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-40 text-nowrap">
                        96&quot; x 48&quot;
                      </TableCell>
                      <TableCell className="text-nowrap">
                        Home Branch:{" "}
                        <strong className="font-semibold">681</strong>
                        <br />
                        Alt Branch:{" "}
                        <strong className="font-semibold">34</strong>
                        <br />
                      </TableCell>
                      {/* <TableCell className="text-center">23</TableCell> */}
                      <TableCell className="text-right">
                        <Input type="number" className="w-16" />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        $250.00
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-40 text-nowrap">
                        96&quot; x 48&quot;
                      </TableCell>
                      <TableCell className="text-nowrap">
                        Home Branch:{" "}
                        <strong className="font-semibold">681</strong>
                        <br />
                        Alt Branch:{" "}
                        <strong className="font-semibold">34</strong>
                        <br />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" className="w-16" />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        $250.00
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex items-center gap-4 rounded bg-gray-50 p-4">
                  <div className="grow">
                    <span className="text-wurth-gray-500">Total:</span>{" "}
                    <strong className="text-lg">$456.00</strong>
                  </div>
                  <Button>Add to cart</Button>
                </div>
              </div>
            </div>
            <div className="mt-4 border-t pt-4">
              <h4 className="pb-2 text-xl font-semibold">
                Matching Edgebanding
              </h4>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    3D Edgebanding, Color 3D700R Brushed Aluminum, 2mm Thick
                    15/16"
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Page;
