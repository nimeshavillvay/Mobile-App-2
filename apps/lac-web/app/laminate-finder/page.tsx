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
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[52rem]">
            <div className="gap-4 lg:flex">
              <div className="flex w-full lg:w-60 lg:flex-none">
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
                      <TableHead className="text-center">
                        Stock
                        <br />
                        <span className="text-xs">(Home Branch)</span>
                      </TableHead>
                      <TableHead className="text-center">
                        Stock
                        <br />
                        <span className="text-xs">(Alt Branch)</span>
                      </TableHead>
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
                      <TableCell className="text-center">681</TableCell>
                      <TableCell className="text-center">23</TableCell>
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
                      <TableCell className="text-center">681</TableCell>
                      <TableCell className="text-center">23</TableCell>
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
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Page;
