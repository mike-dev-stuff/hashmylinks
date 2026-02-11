export interface GoogleFont {
  id: string;
  name: string;
  family: string;
  weights: number[];
  category: string;
  previewText: string;
  googleFontsUrl: string;
}

export const GoogleFonts: GoogleFont[] = [
  {
    id: "font-inter",
    name: "Inter",
    family: "Inter",
    weights: [400, 600, 700],
    category: "sans-serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  },
  {
    id: "font-playfair",
    name: "Playfair Display",
    family: "Playfair Display",
    weights: [400, 600, 700],
    category: "serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap"
  },
  {
    id: "font-roboto",
    name: "Roboto",
    family: "Roboto",
    weights: [400, 500, 700],
    category: "sans-serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
  },
  {
    id: "font-lora",
    name: "Lora",
    family: "Lora",
    weights: [400, 600, 700],
    category: "serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&display=swap"
  },
  {
    id: "font-poppins",
    name: "Poppins",
    family: "Poppins",
    weights: [400, 600, 700],
    category: "sans-serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
  },
  {
    id: "font-merriweather",
    name: "Merriweather",
    family: "Merriweather",
    weights: [400, 700, 900],
    category: "serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap"
  },
  {
    id: "font-raleway",
    name: "Raleway",
    family: "Raleway",
    weights: [400, 600, 700],
    category: "sans-serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap"
  },
  {
    id: "font-oswald",
    name: "Oswald",
    family: "Oswald",
    weights: [400, 600, 700],
    category: "sans-serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&display=swap"
  },
  {
    id: "font-montserrat",
    name: "Montserrat",
    family: "Montserrat",
    weights: [400, 600, 700],
    category: "sans-serif",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
  },
  {
    id: "font-dancing-script",
    name: "Dancing Script",
    family: "Dancing Script",
    weights: [400, 700],
    category: "display",
    previewText: "The quick brown fox jumps over the lazy dog",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
  }
];

export const getFontByFamily = (family: string): GoogleFont | undefined => {
  return GoogleFonts.find(font => font.family === family);
};
