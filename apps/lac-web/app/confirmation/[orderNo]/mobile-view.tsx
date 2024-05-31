import productImage from "@/_assets/images/product-item-image.png";
import {
  getOrderDetails,
  getPaymentMethods,
  getPlants,
} from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cva } from "@/_lib/cva.config";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import { Separator } from "@repo/web-ui/components/ui/separator";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import Instructions from "./instructions";

const containerClasses = cva({ base: "flex flex-col gap-3" });
const subHeadingStyles = cva({ base: "text-sm text-wurth-gray-500" });
const tableStyles = cva({ base: "border-separate border-spacing-y-1" });
const tableLabelStyles = cva({ base: "text-sm text-wurth-gray-800" });
const tableValueStyles = cva({
  base: "pl-2 text-sm font-medium text-wurth-gray-800",
});

type MobileViewProps = {
  readonly orderNo: string;
};

const MobileView = async ({ orderNo }: MobileViewProps) => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken?.value) {
    return redirect("/sign-in");
  }

  const [orderDetails, paymentMethods, plants] = await Promise.all([
    getOrderDetails(sessionToken.value, orderNo),
    getPaymentMethods(),
    getPlants(),
  ]);

  return (
    <div className="container flex flex-col gap-5 md:hidden">
      <div className="flex flex-col gap-4 rounded-lg border border-wurth-gray-150 p-4 shadow-md">
        <h2 className="text-base font-semibold text-wurth-gray-800">
          Order Receipt
        </h2>

        <section className="flex flex-col gap-4">
          <div className={containerClasses()}>
            <h3 className={subHeadingStyles()}>Order details</h3>

            <table className={tableStyles()}>
              <tbody>
                <tr>
                  <td className={tableLabelStyles()}>Order no.</td>
                  <td className={tableValueStyles()}>{orderDetails.orderNo}</td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Order date</td>
                  <td className={tableValueStyles()}>
                    {dayjs(orderDetails.orderDate).format("MM/DD/YYYY")}
                  </td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Job name</td>
                  <td className={tableValueStyles()}>{orderDetails.jobName}</td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>PO no.</td>
                  <td className={tableValueStyles()}>{orderDetails.po}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator
            orientation="horizontal"
            className="h-px w-full bg-wurth-gray-150"
          />

          <div className={containerClasses()}>
            <h3 className={subHeadingStyles()}>Billing details</h3>

            <table className={tableStyles()}>
              <tbody>
                <tr>
                  <td className={tableLabelStyles()}>Payment method</td>
                  <td className={tableValueStyles()}>
                    {
                      paymentMethods.find(
                        (method) => method.code === orderDetails.paymentMethod,
                      )?.name
                    }
                  </td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Bill to</td>
                  <td className={tableValueStyles()}>{orderDetails.email}</td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Email address</td>
                  <td className={tableValueStyles()}>{orderDetails.orderBy}</td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Billing address</td>
                  <td className={tableValueStyles()}>
                    {orderDetails.billToAddress.street},{" "}
                    {orderDetails.billToAddress.city},{" "}
                    {orderDetails.billToAddress.region},{" "}
                    {orderDetails.billToAddress.shipTo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator
            orientation="horizontal"
            className="h-px w-full bg-wurth-gray-150"
          />

          <div className={containerClasses()}>
            <h3 className={subHeadingStyles()}>Shipping details</h3>

            <table className={tableStyles()}>
              <tbody>
                <tr>
                  <td className={tableLabelStyles()}>Delivery date</td>
                  <td className={tableValueStyles()}>
                    {dayjs(orderDetails.orderDate).format("MM/DD/YYYY")}
                  </td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Ship to address</td>
                  <td className={tableValueStyles()}>
                    {orderDetails.shipToAddress.street},{" "}
                    {orderDetails.shipToAddress.city},{" "}
                    {orderDetails.shipToAddress.region},{" "}
                    {orderDetails.shipToAddress.zipCode}
                  </td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Contact person</td>
                  <td className={tableValueStyles()}>{orderDetails.orderBy}</td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Phone no.</td>
                  <td className={tableValueStyles()}>800 42 24389</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator
            orientation="horizontal"
            className="h-px w-full bg-wurth-gray-150"
          />
        </section>

        <section className="flex flex-col gap-4">
          <div className={containerClasses()}>
            <h3 className={subHeadingStyles()}>Ordered items</h3>

            {orderDetails.items.map((item) =>
              item.lineItems.map((lineItem) => (
                <Fragment key={lineItem.itemNo}>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-start gap-3">
                      <Image
                        src={productImage} // TODO Add real image
                        alt={`An image of ${lineItem.itemDescription}`}
                        width={84}
                        height={84}
                        className="shrink-0 rounded border border-wurth-gray-250 object-contain shadow-sm"
                      />

                      <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center justify-between text-sm text-wurth-gray-800">
                          <div>{lineItem.itemTotalQuantity} each</div>

                          <div>${formatNumberToPrice(lineItem.totalPrice)}</div>
                        </div>

                        <h4
                          className="text-sm font-medium text-wurth-gray-800"
                          dangerouslySetInnerHTML={{
                            __html: lineItem.itemDescription,
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-wurth-gray-800">
                      <div>
                        {lineItem.shipQuantity} items pickup at{" "}
                        {
                          plants.find((plant) => plant.code === lineItem.plant)
                            ?.name
                        }
                      </div>

                      {lineItem.boQty > 0 && !!lineItem.boDate && (
                        <div>
                          Backorder {lineItem.shipQuantity} items, ship by{" "}
                          {dayjs(lineItem.boDate).format("ddd, MMM. D, YYYY")}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator
                    orientation="horizontal"
                    className="h-px w-full bg-wurth-gray-150"
                  />
                </Fragment>
              )),
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className={containerClasses()}>
            <h3 className={subHeadingStyles()}>Order Summary</h3>

            <table className={tableStyles()}>
              <tbody>
                <tr>
                  <td className={tableLabelStyles()}>
                    Subtotal (
                    {orderDetails.items.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.totalQuantity,
                      0,
                    )}{" "}
                    items)
                  </td>
                  <td
                    className={cn(tableValueStyles(), "text-right font-normal")}
                  >
                    ${formatNumberToPrice(orderDetails.subTotal)}
                  </td>
                </tr>

                {orderDetails.discount > 0 && (
                  <tr>
                    <td className={tableLabelStyles()}>Bill to</td>
                    <td className={cn(tableValueStyles(), "text-right")}>
                      -${orderDetails.discount}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className={tableLabelStyles()}>Shipping</td>
                  <td
                    className={cn(tableValueStyles(), "text-right font-normal")}
                  >
                    {orderDetails.handlingFee > 0
                      ? `$${formatNumberToPrice(orderDetails.handlingFee)}`
                      : "Free"}
                  </td>
                </tr>

                <tr>
                  <td className={tableLabelStyles()}>Sales tax</td>
                  <td className={cn(tableValueStyles(), "text-right")}>
                    ${formatNumberToPrice(orderDetails.taxAmount)}
                  </td>
                </tr>
              </tbody>
            </table>

            <Separator
              orientation="horizontal"
              className="h-px w-full bg-wurth-gray-150"
            />

            <div className="flex flex-row items-center justify-between pb-4 text-base text-wurth-gray-800">
              <div>Estimated total</div>

              <div>${formatNumberToPrice(orderDetails.orderTotal)}</div>
            </div>
          </div>
        </section>
      </div>

      {!!orderDetails.driverNotes && (
        <div className="rounded-lg bg-wurth-gray-50 px-6 py-5 text-sm text-wurth-gray-800">
          <h3>Driver&apos;s Notes</h3>

          <p className="leading-6">{orderDetails.driverNotes}</p>
        </div>
      )}

      <Instructions type="mobile" />
    </div>
  );
};

export default MobileView;
