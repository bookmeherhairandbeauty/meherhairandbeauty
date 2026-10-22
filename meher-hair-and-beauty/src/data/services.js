// Transcribed from the supplied printed menus. See LAUNCH-CHECKLIST.md for source notes.
const group = (id, name, description, rows) => ({
  id,
  name,
  description,
  services: rows.map(([name, price, from = false, note = ""], i) => ({
    id: `${id}-${i + 1}`,
    name,
    price,
    from,
    note,
  })),
});
export const categories = [
  group(
    "haircuts",
    "Haircuts",
    "A fresh cut. A little lift. A look that feels like you.",
    [
      ["Hair Cut", 15, true],
      ["Wash Cut Blow Dry", 35, true],
      ["Kids Cut", 10, true],
    ],
  ),
  group("colour", "Hair Colour", "From a root refresh to a whole new shade.", [
    ["Root Cover", 35, true],
    ["Full Head Colour", 50, true],
    ["T-section Highlights", 70, true],
    ["Full Head Highlights", 110, true],
  ]),
  group("treatments", "Hair Treatments", "Make a little time for your hair.", [
    ["Keratin Treatment", 90, true],
    ["Hair Treatment", 35, true],
  ]),
  group(
    "threading",
    "Threading",
    "The small details that bring your look together.",
    [
      ["Eyebrow", 5],
      ["Upper Lip", 3],
      ["Lower Lip", 2],
      ["Chin", 5, true],
      ["Side", 6],
      ["Forehead", 4],
      ["Full Face", 20, false, "With eyebrow"],
    ],
  ),
  group(
    "tinting",
    "Tinting & Lamination",
    "Definition for your brows and lashes.",
    [
      ["Eyebrow", 8],
      ["Eyebrow Threading & Tint", 12],
      ["Eyelashes", 10],
      ["Eyebrow lamination", 35],
      ["Eyelashes Lift", 40],
    ],
  ),
  group(
    "waxing",
    "Body Waxing",
    "Face and body waxing, with individual and combined treatments.",
    [
      ["Full Arms", 15],
      ["Half Arms", 10],
      ["Full Legs", 20, true],
      ["Half Legs", 15],
      ["Under Arms", 8],
      ["Full Legs with Bikini Line", 25],
      ["Bikini Line", 15],
      ["Back Wax", 10],
      ["Brazilian", 30],
      ["Hollywood", 35],
      ["Full Body Wax", 85, false, "With eyebrow free"],
      ["Full Legs & Full Arms Wax", 40, false, "Under arms free"],
      ["Eyebrow", 6],
      ["Upper Lip", 4],
      ["Sides", 7],
      ["Chin", 6],
      ["Chin+ Sides+Upper Lip", 12],
    ],
  ),
  group(
    "lashes",
    "Eyelash Extensions",
    "From a subtle accent to a fuller lash look.",
    [
      ["Clusters", 20, true],
      ["Classic Mink", 45],
      ["Mink Individual Full Set", 50],
      ["Russian Volume", 60],
    ],
  ),
  group("facials", "Facials", "A moment for you and your skincare routine.", [
    ["Face cleaning", 15],
    ["Herbal", 35],
    ["Gold", 40],
    ["Deep cleaning", 45],
    ["Whitening facial", 45],
    ["HydraFacial", 80],
    ["microdermabrasion", 50],
    ["Microneedling facial", 110],
  ]),
  group(
    "makeup",
    "Makeup",
    "Finishing touches for everyday moments and special occasions.",
    [
      ["Basic Make Up", 40, true],
      ["Party Make Up", 60, true],
      ["Bridal Make Up", 300, true],
    ],
  ),
];
export const services = categories.flatMap((category) =>
  category.services.map((service) => ({
    ...service,
    categoryId: category.id,
    categoryName: category.name,
  })),
);
export const formatPrice = (service) =>
  `${service.from ? "From " : ""}£${service.price.toFixed(2)}`;
