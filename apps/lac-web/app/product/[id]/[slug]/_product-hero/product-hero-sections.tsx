import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import Save from "@repo/web-ui/components/icons/save";
import Truck from "@repo/web-ui/components/icons/truck";
import { Button } from "@repo/web-ui/components/ui/button";
import { type ReactNode } from "react";
import Balancer from "react-wrap-balancer";

export const ProductNumbers = ({
  groupId,
  productId,
  className,
}: {
  groupId: string;
  productId: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-2 text-sm font-normal text-wurth-gray-800",
        className,
      )}
    >
      <div>
        Item # <span className="font-medium">{groupId}</span>
      </div>

      <span className="select-none">•</span>

      <div>
        Model # <span className="font-medium">{productId}</span>
      </div>
    </div>
  );
};

export const ProductDescription = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-base text-wurth-gray-500", className)}>
      <Balancer>{children}</Balancer>
    </p>
  );
};

export const ProductPrices = ({ className }: { className?: string }) => {
  return (
    <section className={cn("space-y-3 md:space-y-4", className)}>
      <div className="flex flex-row items-end gap-1 text-lg leading-6 text-wurth-gray-800">
        <div className="text-xl font-semibold leading-none">
          $<span className="font-title text-[1.75rem] leading-8">8.33</span>
        </div>

        <div className="text-wurth-gray-400 line-through">$18.32</div>

        <div>
          <span className="text-sm font-semibold">/</span>
          <span className="font-title leading-none">pair</span>
        </div>

        <div className="font-semibold text-green-700">You save $0</div>
      </div>

      <div className="grid grid-cols-2 gap-0.5">
        {[
          { items: "25-99", price: 8.06, uom: "pair" },
          { items: "100+", price: 7.75, uom: "pair" },
        ].map((item) => (
          <div
            key={item.items}
            className="rounded-lg bg-wurth-gray-50 px-4 py-3 odd:rounded-r-none last:odd:rounded-r-lg even:rounded-l-none md:py-2"
          >
            <h5 className="text-sm font-medium text-wurth-gray-800">
              {item.items} items
            </h5>

            <div className="text-sm font-semibold leading-none text-wurth-gray-800">
              <span className="text-base font-bold leading-6">
                ${item.price}
              </span>
              /{item.uom}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const DropShipItemNotice = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="flex flex-row gap-2 rounded-lg bg-wurth-gray-50 p-4">
        <Truck className="mt-1 size-4 shrink-0" />

        <div className="flex-1 space-y-1">
          <h4 className="text-base font-semibold text-wurth-gray-800">
            Drop Ship Item
          </h4>

          <p className="text-sm leading-6 text-wurth-gray-500">
            This item ships directly from the vendor. Additional freight charges
            may apply.
          </p>
        </div>
      </div>
    </section>
  );
};

type GroupAsset = {
  title: string;
  file_name: string;
  file_path: string;
};
export const ProductDetails = async ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const attachments = await api
    .get(`rest/landingattachment/${id}`, {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      group_assets_images: GroupAsset[];
      group_assets_doc: GroupAsset[];
      group_assets_video: GroupAsset[];
      group_assets_downloads: GroupAsset[];
      cross_sell: unknown[];
    }>();

  return (
    <section className={cn("text-wurth-gray-800", className)}>
      <h2 className="mb-4 font-title text-2xl font-medium tracking-[-0.144px]">
        Product Details
      </h2>

      <div className="mb-6 space-y-7 text-base font-normal leading-7">
        <p>
          For drawers, right-hand or left-hand doors with lipped/overlay
          construction (straight cam) or flush construction (formed cam). For
          overlay application, the combined thickness of front and frame cannot
          exceed the cylinder length.
        </p>

        <div>
          <h3 className="font-semibold leading-6">Features</h3>

          <ul className="list-inside list-disc pl-2">
            <li>90° cam turn</li>

            <li>Key removable in both locked and unlocked positions</li>

            <li>
              Will key together with all other disc tumbler locks using D8785
              key blank
            </li>

            <li>
              Supplied with two keys, trim washer, spur washer (for wood),
              mounting nut and two cams
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-8 flex flex-row items-center gap-4 rounded-xl bg-yellow-50 px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="none"
          viewBox="0 0 36 36"
          className="shrink-0 md:size-7"
        >
          <path
            fill="#F59E0B"
            d="M15.11 3.9c1.154-2 4.04-2 5.196 0l14.549 25.2c1.155 2-.289 4.5-2.598 4.5H3.158c-2.31 0-3.752-2.5-2.598-4.5L15.11 3.9z"
          />
          <path
            fill="#000"
            fillRule="evenodd"
            d="M27.142 18.142L33.816 29.7c.692 1.2-.174 2.7-1.56 2.7H3.159c-1.385 0-2.251-1.5-1.559-2.7l6.508-11.272V30.6h2.11v-5.678h1.142c.725 0 1.287-.17 1.685-.508.4-.338.675-.831.827-1.48.158-.655.236-1.446.236-2.373v-.303c0-.66-.044-1.24-.133-1.743-.09-.507-.24-.932-.45-1.276a1.997 1.997 0 00-.865-.777c-.363-.175-.82-.262-1.37-.262H9.394l6.755-11.7c.692-1.2 2.424-1.2 3.117 0l6.755 11.7h-4.02v7.184l1.996.162c0-.47.077-.818.229-1.044a.739.739 0 01.652-.34c.35 0 .575.143.677.429.101.28.152.652.152 1.116v3.64c0 .47-.062.82-.186 1.052-.119.232-.339.348-.66.348-.361 0-.59-.124-.686-.372-.096-.253-.144-.566-.144-.938v-1.562h-2.124v1.788c0 .599.099 1.12.296 1.562.204.436.522.776.957 1.019.434.237 1.001.356 1.7.356.695 0 1.245-.105 1.65-.316.407-.215.709-.539.906-.97.203-.437.336-.987.398-1.65.062-.664.093-1.443.093-2.339v-.291c0-1.068-.07-1.947-.211-2.637-.136-.69-.373-1.203-.711-1.537-.333-.335-.799-.502-1.396-.502-.328 0-.632.062-.915.186-.282.119-.476.28-.583.486V18.14h3.051zM15.11 3.9c1.155-2 4.042-2 5.197 0l14.549 25.2c1.155 2-.289 4.5-2.598 4.5H3.158c-2.31 0-3.752-2.5-2.598-4.5L15.11 3.9zm2.962 26.7c-.689 0-1.254-.099-1.694-.296a2.35 2.35 0 01-1.026-.87c-.243-.38-.412-.837-.508-1.375a11.268 11.268 0 01-.136-1.838v-5.778c0-1.07.125-1.915.373-2.533.249-.618.622-1.058 1.119-1.319.502-.26 1.135-.391 1.897-.391.661 0 1.204.114 1.627.344.43.229.749.604.958 1.126.209.517.316 1.212.322 2.086v.727h-2.119v-.288c0-.527-.017-.945-.05-1.254-.034-.314-.116-.538-.246-.671-.124-.139-.325-.208-.602-.208-.288 0-.505.072-.652.216-.141.138-.237.37-.288.695-.045.32-.068.756-.068 1.31v2.006a1.52 1.52 0 01.695-.487c.3-.117.63-.179.991-.184.678-.01 1.209.141 1.593.455.384.31.655.776.813 1.399.158.623.238 1.398.238 2.325v.775c0 .88-.094 1.62-.28 2.222-.18.597-.506 1.047-.974 1.35-.464.304-1.124.456-1.983.456zm0-1.862c.271 0 .483-.053.635-.16.153-.106.258-.287.314-.543.062-.261.093-.618.093-1.071v-1.335c0-.522-.03-.94-.093-1.254-.056-.314-.158-.544-.305-.687-.147-.144-.347-.216-.602-.216-.214 0-.403.037-.567.112-.158.069-.288.16-.39.271a.752.752 0 00-.178.368v2.541c0 .453.031.826.093 1.119.068.288.181.503.34.647.163.139.383.208.66.208zm-7.129-5.625h-.724v-5.228h.74c.446 0 .732.202.858.606.126.398.192.987.197 1.767v.278c0 .633-.026 1.14-.079 1.522-.047.376-.147.646-.299.81-.152.164-.383.245-.693.245z"
            clipRule="evenodd"
          />
        </svg>

        <p className="text-sm">
          Please be advised that product(s) you’re purchasing may have State of
          California Prop 65 warnings associated. For more information, go to
          www.P65Warnings.ca.gov.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Downloads</h3>

        <div className="grid grid-cols-2 gap-2">
          {attachments.group_assets_doc.map((attachment) => (
            <Button
              key={attachment.file_path}
              variant="outline"
              className="flex h-fit max-w-full flex-col items-start gap-2 rounded-lg border-wurth-gray-250 p-3 shadow-sm"
            >
              <Save className="mt-1 size-5 shrink-0" />

              <span className="text-wrap text-left text-sm font-semibold text-wurth-gray-800">
                {attachment.title}
              </span>
            </Button>
          ))}
        </div>

        <Button variant="link" className="h-fit p-0 text-sm font-medium">
          View all downloads
        </Button>
      </div>
    </section>
  );
};

export const ProductSpecifications = ({
  attributes,
  className,
}: {
  attributes: { name: string; value: string }[];
  className?: string;
}) => {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="font-title text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800">
        Specifications
      </h2>

      <table className="w-full">
        <tbody>
          {attributes.map((attribute) => (
            <tr
              key={attribute.name}
              className="border-b border-b-wurth-gray-150 text-sm"
            >
              <td className="w-1/2 px-2 py-3 text-wurth-gray-500">
                {attribute.name}
              </td>

              <td className="w-1/2 px-2 py-3 font-semibold text-wurth-gray-800">
                {attribute.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};