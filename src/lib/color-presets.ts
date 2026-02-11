export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  category: "neutral" | "vibrant" | "pastel" | "dark";
}

export const ColorPresets: ColorPreset[] = [
  // Neutral tones
  { id: "color-black", name: "Black", hex: "#000000", category: "neutral" },
  { id: "color-charcoal", name: "Charcoal", hex: "#2c3e50", category: "neutral" },
  { id: "color-gray", name: "Gray", hex: "#7f8c8d", category: "neutral" },
  { id: "color-white", name: "White", hex: "#ffffff", category: "neutral" },

  // Vibrant colors
  { id: "color-teal", name: "Teal", hex: "#1a9988", category: "vibrant" },
  { id: "color-blue", name: "Blue", hex: "#3498db", category: "vibrant" },
  { id: "color-purple", name: "Purple", hex: "#9b59b6", category: "vibrant" },
  { id: "color-red", name: "Red", hex: "#e74c3c", category: "vibrant" },
  { id: "color-orange", name: "Orange", hex: "#e67e22", category: "vibrant" },
  { id: "color-green", name: "Green", hex: "#27ae60", category: "vibrant" },

  // Pastel tones
  { id: "color-pastel-pink", name: "Soft Pink", hex: "#ffc7d4", category: "pastel" },
  { id: "color-pastel-blue", name: "Soft Blue", hex: "#a8d8ea", category: "pastel" },
  { id: "color-pastel-yellow", name: "Soft Yellow", hex: "#fff5ba", category: "pastel" },
  { id: "color-pastel-green", name: "Soft Green", hex: "#d4f1d4", category: "pastel" },

  // Dark tones
  { id: "color-navy", name: "Navy", hex: "#0f2537", category: "dark" },
  { id: "color-burgundy", name: "Burgundy", hex: "#800020", category: "dark" },
];
