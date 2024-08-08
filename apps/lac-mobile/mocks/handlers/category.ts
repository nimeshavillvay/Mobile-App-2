import { API_BASE_URL } from "@/lib/constants";
import { HttpResponse, http, type HttpHandler } from "msw";

export const categoryHttpHandlers: HttpHandler[] = [
  // Category with sub categories
  http.get(`${API_BASE_URL}/rest/productlandingcategory/1`, () => {
    return HttpResponse.json({
      main: {
        catId: "113",
        type: "main",
        catTitle: "Woodworking and Shop Supplies",
        description:
          '<p>Our woodworking supplies include kitchen cabinet hardware, sinks and faucets, lighting, <a href="https://www.wurthmachinery.com/knobs-and-pulls/">knobs and pulls</a>, drawer slides, office hardware, <a href="https://www.wurthmachinery.com/power-tools-air-tools-and-accessories/">power tools</a> and other equipment needed to get the job done. From renovating a home or reorganizing to updating <a href="https://www.wurthmachinery.com/kitchen-hardware-and-accessories/">kitchen hardware</a> or finding specific hardware supplies for a drawer, we&rsquo;ve got you covered!</p>\r\n<h2>Woodworking Hardware &amp; Supplies From Trusted Brands</h2>\r\n<p>At Wurth Machinery, we offer the highest-quality cabinet hardware and woodworking supplies from trusted brands like <a href="https://www.wurthmachinery.com/blum/">Blum</a>, <a href="https://www.wurthmachinery.com/jlt-clamps/">JLT Clamps</a>, <a href="https://www.wurthmachinery.com/3m/">3M</a> and more. Whether you&rsquo;re a precision workshop or a hobbyist interested in DIY solutions, shop for tools and supplies used in professionally crafted kitchens, baths and cabinetry. Find top-quality products at the best value.&nbsp;</p>\r\n<h2>Our Professional Team is Ready to Assist You&nbsp;</h2>\r\n<p>In addition to our extensive woodworking tools, our experts can offer guidance on everything from selecting the right supplies to optimizing your workshop&rsquo;s layout for maximum efficiency and productivity. We&rsquo;re passionate about what we do, from high-quality woodworking supplies to top-notch customer service that goes far beyond the extra mile. As a trusted partner in all things woodworking and <a href="https://www.wurthmachinery.com/metalworking-machinery/">metalworking machinery</a> and equipment, it&rsquo;s part of our commitment to your success. Contact us for expertise, support, and assistance on all of your projects — big and small.&nbsp;</p>\r\n',
        additional_description:
          '<p>Find essential woodworking supplies, tools and hardware at Wurth Machinery. We supply everything from metalworking and <a href="https://www.wurthmachinery.com/machinery/">woodworking machinery</a> to hardware supplies and hand tools, delivering the equipment you need to keep your workshop running smoothly and efficiently. Whether you&rsquo;re a professional, hobbyist, or at-home DIY enthusiast, Wurth Machinery is your trusted, primary source of premium woodworking hardware.</p>\r\n',
        Image: null,
        slug: "woodworking-and-shop-supplies",
        subCatgores: [
          {
            SubCatId: "137",
            SubCatTitle: "Abrasives",
            slug: "woodworking-and-shop-abrasives",
            Image:
              "https://xcart.wurthlac.com/images/C/Abrasives-Disks_1-01-01.png",
          },
          {
            SubCatId: "517",
            SubCatTitle: "Adhesives, Caulking & Sealants",
            slug: "adhesives-caulking-sealants",
            Image:
              "https://xcart.wurthlac.com/images/C/Adhesives-CaulkingandSealants_2-01-01.png",
          },
          {
            SubCatId: "617",
            SubCatTitle: "Bathroom Hardware & Accessories",
            slug: "bathroom-hardware-and-accessories",
            Image:
              "https://xcart.wurthlac.com/images/C/Bathroom-Curling_Iron_Holders_1-01-01.png",
          },
          {
            SubCatId: "624",
            SubCatTitle: "Catches & Locks",
            slug: "catches-and-locks",
            Image:
              "https://xcart.wurthlac.com/images/C/CatchesandLocks-Locks-Drawer_Locks-03-01.png",
          },
          {
            SubCatId: "658",
            SubCatTitle: "Decorative Hardware & Wood Components",
            slug: "decorative-hardware-and-wood-components",
            Image:
              "https://xcart.wurthlac.com/images/C/Decorative_Decorative_Grills_1-01-01.png",
          },
          {
            SubCatId: "183",
            SubCatTitle: "Drawer Slides & Systems",
            slug: "drawer-slides-and-systems",
            Image:
              "https://xcart.wurthlac.com/images/C/Drawer_Slides_Drawer-Drawer_Slides-01-01.png",
          },
          {
            SubCatId: "707",
            SubCatTitle: "Fasteners & Assembly Fittings",
            slug: "fasteners-and-assembly-fittings",
            Image:
              "https://xcart.wurthlac.com/images/C/Fasteners-Screws-01-01.png",
          },
          {
            SubCatId: "729",
            SubCatTitle: "Finishing Products & Equipment",
            slug: "finishing-products-and-equipment",
            Image:
              "https://xcart.wurthlac.com/images/C/Finishing_Products-Chemcraft-01-01.png",
          },
          {
            SubCatId: "767",
            SubCatTitle: "Hand Tools & Clamps",
            slug: "hand-tools-and-clamps",
            Image:
              "https://xcart.wurthlac.com/images/C/Hand_Tools-PliersandCutters-01-01.png",
          },
          {
            SubCatId: "790",
            SubCatTitle: "Hinges and Lift Systems",
            slug: "hinges-and-lift-systems",
            Image:
              "https://xcart.wurthlac.com/images/C/Hinges-Euro_Hinges-Standard-01-01.png",
          },
          {
            SubCatId: "817",
            SubCatTitle: "Kitchen Hardware & Accessories",
            slug: "kitchen-hardware-and-accessories",
            Image:
              "https://xcart.wurthlac.com/images/C/Kitchen_Hardware-Trash-01-01.png",
          },
          {
            SubCatId: "854",
            SubCatTitle: "Knobs & Pulls",
            slug: "knobs-and-pulls",
            Image:
              "https://xcart.wurthlac.com/images/C/KnobsandPulls-Knobs-01-01.png",
          },
          {
            SubCatId: "882",
            SubCatTitle: "Laminate, Panels and Edgebanding",
            slug: "laminate-panels-and-edgebanding",
            Image:
              "https://xcart.wurthlac.com/images/C/Laminate-Laminate-01-01.png",
          },
          {
            SubCatId: "903",
            SubCatTitle: "Lighting",
            slug: "lighting",
            Image:
              "https://xcart.wurthlac.com/images/C/Lighting-Lights-LED-01-01.png",
          },
          {
            SubCatId: "912",
            SubCatTitle: "Office & Furniture Hardware",
            slug: "office-and-furniture-hardware",
            Image:
              "https://xcart.wurthlac.com/images/C/Office_Furniture-Grommets-01-01.png",
          },
          {
            SubCatId: "924",
            SubCatTitle: "Power Tools, Air Tools & Accessories",
            slug: "power-tools-air-tools-and-accessories",
            Image:
              "https://xcart.wurthlac.com/images/C/Power_Tools-Drills-03-01.png",
          },
          {
            SubCatId: "941",
            SubCatTitle: "Shelf & Closet Hardware",
            slug: "shelf-and-closet-hardware",
            Image:
              "https://xcart.wurthlac.com/images/C/ShelfandCloset-Closet_Rod_Regular-01-01.png",
          },
          {
            SubCatId: "964",
            SubCatTitle: "Shop Supplies & Safety Equipment",
            slug: "shop-supplies-and-safety-equipment",
            Image:
              "https://xcart.wurthlac.com/images/C/Shop_Supplies-Gloves-01-01.png",
          },
          {
            SubCatId: "1014",
            SubCatTitle: "Sinks & Faucets",
            slug: "sinks-and-faucets",
            Image: "https://xcart.wurthlac.com/images/C/Sinks-Quartz-01-01.png",
          },
          {
            SubCatId: "1021",
            SubCatTitle: "Tooling",
            slug: "tooling",
            Image:
              "https://xcart.wurthlac.com/images/C/Tooling-Router_Bits-01-01.png",
          },
        ],
      },
    });
  }),
  // Category without sub categories
  http.get(`${API_BASE_URL}/rest/productlandingcategory/2`, () => {
    return HttpResponse.json({
      main: {
        catId: "113",
        type: "main",
        catTitle: "Woodworking and Shop Supplies",
        description:
          '<p>Our woodworking supplies include kitchen cabinet hardware, sinks and faucets, lighting, <a href="https://www.wurthmachinery.com/knobs-and-pulls/">knobs and pulls</a>, drawer slides, office hardware, <a href="https://www.wurthmachinery.com/power-tools-air-tools-and-accessories/">power tools</a> and other equipment needed to get the job done. From renovating a home or reorganizing to updating <a href="https://www.wurthmachinery.com/kitchen-hardware-and-accessories/">kitchen hardware</a> or finding specific hardware supplies for a drawer, we&rsquo;ve got you covered!</p>\r\n<h2>Woodworking Hardware &amp; Supplies From Trusted Brands</h2>\r\n<p>At Wurth Machinery, we offer the highest-quality cabinet hardware and woodworking supplies from trusted brands like <a href="https://www.wurthmachinery.com/blum/">Blum</a>, <a href="https://www.wurthmachinery.com/jlt-clamps/">JLT Clamps</a>, <a href="https://www.wurthmachinery.com/3m/">3M</a> and more. Whether you&rsquo;re a precision workshop or a hobbyist interested in DIY solutions, shop for tools and supplies used in professionally crafted kitchens, baths and cabinetry. Find top-quality products at the best value.&nbsp;</p>\r\n<h2>Our Professional Team is Ready to Assist You&nbsp;</h2>\r\n<p>In addition to our extensive woodworking tools, our experts can offer guidance on everything from selecting the right supplies to optimizing your workshop&rsquo;s layout for maximum efficiency and productivity. We&rsquo;re passionate about what we do, from high-quality woodworking supplies to top-notch customer service that goes far beyond the extra mile. As a trusted partner in all things woodworking and <a href="https://www.wurthmachinery.com/metalworking-machinery/">metalworking machinery</a> and equipment, it&rsquo;s part of our commitment to your success. Contact us for expertise, support, and assistance on all of your projects — big and small.&nbsp;</p>\r\n',
        additional_description:
          '<p>Find essential woodworking supplies, tools and hardware at Wurth Machinery. We supply everything from metalworking and <a href="https://www.wurthmachinery.com/machinery/">woodworking machinery</a> to hardware supplies and hand tools, delivering the equipment you need to keep your workshop running smoothly and efficiently. Whether you&rsquo;re a professional, hobbyist, or at-home DIY enthusiast, Wurth Machinery is your trusted, primary source of premium woodworking hardware.</p>\r\n',
        Image: null,
        slug: "woodworking-and-shop-supplies",
        subCatgores: [],
      },
    });
  }),
];
