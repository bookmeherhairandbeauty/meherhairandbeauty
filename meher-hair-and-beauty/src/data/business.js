export const business = {
  name: "Meher Hair & Beauty",
  address: "44 Fife Road, Canning Town, London E16 1QB, United Kingdom",
  phone: "07903 129 511",
  phoneHref: "tel:+447903129511",
  email: "meherhairandbeauty@gmail.com",
  instagram: "https://www.instagram.com/meherhairandbeauty/",
  tiktok: "https://www.tiktok.com/@meherhairandbeauty",
  WebburnerTech: "https://www.webburner.tech/",
  // Confirm opening hours and owner/story before replacing these placeholders.
  openingHours:
    "Opening hours to be confirmed. Please call or message us before visiting.",
  story: "Our salon story and owner introduction will be added here soon.",
};
export const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`;
export const imagePath = (name) => `${import.meta.env.BASE_URL}images/${name}`;
