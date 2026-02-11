"use client";

import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColorPreset } from "@/lib/color-presets";
import { Check } from "lucide-react";

interface ColorSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets: ColorPreset[];
  showPicker?: boolean;
}

export function ColorSelector({
  label,
  value,
  onChange,
  presets,
  showPicker = true
}: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <FormLabel>{label}</FormLabel>

      {/* Color Picker */}
      {showPicker && (
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-20 rounded border border-input cursor-pointer"
          />
          <Input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
            className="flex-1 font-mono text-sm"
            pattern="^#[0-9A-Fa-f]{6}$"
          />
        </div>
      )}

      {/* Preset Swatches */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Preset Colors:</p>
        <div className="grid grid-cols-8 gap-2">
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
                  <Check className="w-4 h-4 text-white drop-shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
