"use client";

import type { Attribute, Variant } from "../types";

type VariationsTableProps = {
  attributes: Attribute[];
  variants: Variant[];
};

const VariationsTable = ({ attributes, variants }: VariationsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Item # / MFR Part #</th>

          {attributes.map((attribute) => (
            <th key={attribute.slug}>{attribute.name.trim()}</th>
          ))}

          <th>UOM</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {variants.map((variant) => (
          <tr key={variant.txt_wurth_lac_item}>
            <td>
              <div>{variant.txt_wurth_lac_item}</div>
              <div>{variant.txt_mfn}</div>
            </td>

            {attributes.map((attribute) => (
              <td key={attribute.slug}>
                {
                  variant.Attributes.find(
                    (variantAttribute) =>
                      variantAttribute.slug === attribute.slug,
                  )?.value
                }
              </td>
            ))}

            <td>{variant.txt_uom_label}</td>

            <td>
              <button className="bg-brand-primary rounded p-2 text-white">
                Login to buy
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VariationsTable;
