"use client";

import { Input } from "@/components/ui/input";
import { ColorPreset } from "@/lib/color-presets";
import { Check } from "lucide-react";

interface CompactColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  presets: ColorPreset[];
}

export function CompactColorPicker({ value, onChange, presets }: CompactColorPickerProps) {
  return (
    <div className="w-64 space-y-3 p-2">
      {/* Color Picker */}
      <div className="flex justify-center">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded border border-input cursor-pointer"
        />
      </div>

      {/* Preset Swatches */}
      <div className="grid grid-cols-8 gap-1.5">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.hex)}
            className="relative aspect-square rounded-md border-2 hover:scale-110 transition-transform"
            style={{
              backgroundColor: preset.hex,
              borderColor: value === preset.hex ? 'hsl(var(--primary))' : 'transparent'
            }}
            title={preset.name}
          >
            {value === preset.hex && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="w-3 h-3 text-white drop-shadow-lg" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
