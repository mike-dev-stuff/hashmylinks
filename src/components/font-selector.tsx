"use client";

import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GoogleFont } from "@/lib/google-fonts";
import { Check } from "lucide-react";

interface FontSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets: GoogleFont[];
  placeholder?: string;
}

export function FontSelector({
  label,
  value,
  onChange,
  presets,
  placeholder = "Default Font"
}: FontSelectorProps) {
  const [showPresets, setShowPresets] = useState(true);

  return (
    <div className="space-y-3">
      <FormLabel>{label}</FormLabel>

      {/* Current Selection Display */}
      <div className="p-3 border rounded-lg bg-muted/30">
        <p className="text-sm text-muted-foreground mb-1">Selected Font:</p>
        <p className="font-semibold">{value || placeholder}</p>
      </div>

      {/* Toggle Presets */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowPresets(!showPresets)}
        className="text-xs"
      >
        {showPresets ? "Hide" : "Show"} Font Gallery
      </Button>

      {/* Font Gallery */}
      {showPresets && (
        <div className="grid grid-cols-1 gap-2 p-2 border rounded-lg bg-muted/30 max-h-80 overflow-y-auto">
          {presets.map((font) => (
            <button
              key={font.id}
              type="button"
              onClick={() => onChange(font.family)}
              className="relative p-4 rounded border-2 hover:border-primary transition-colors text-left"
              style={{
                borderColor: value === font.family ? 'hsl(var(--primary))' : 'transparent',
                fontFamily: `'${font.family}', ${font.category}`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{font.name}</span>
                {value === font.family && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="text-base" style={{ fontFamily: `'${font.family}', ${font.category}` }}>
                {font.previewText}
              </p>
              <span className="text-xs text-muted-foreground mt-1 block capitalize">
                {font.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
