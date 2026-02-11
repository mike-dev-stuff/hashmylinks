"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/lib/placeholder-images";
import { Check } from "lucide-react";

interface ImageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets: ImagePlaceholder[];
  placeholder?: string;
}

export function ImageSelector({
  label,
  value,
  onChange,
  presets,
  placeholder = "https://example.com/image.jpg"
}: ImageSelectorProps) {
  const [showPresets, setShowPresets] = useState(true);

  return (
    <div className="space-y-3">
      <FormLabel>{label}</FormLabel>

      {/* URL Input */}
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="url"
      />

      {/* Toggle Presets */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowPresets(!showPresets)}
        className="text-xs"
      >
        {showPresets ? "Hide" : "Show"} Preset Gallery
      </Button>

      {/* Preset Gallery */}
      {showPresets && (
        <div className="grid grid-cols-3 gap-2 p-2 border rounded-lg bg-muted/30">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.imageUrl)}
              className="relative aspect-video rounded overflow-hidden border-2 hover:border-primary transition-colors group"
              style={{
                borderColor: value === preset.imageUrl ? 'hsl(var(--primary))' : 'transparent'
              }}
            >
              <img
                src={preset.imageUrl}
                alt={preset.description}
                className="w-full h-full object-cover"
              />
              {value === preset.imageUrl && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary-foreground" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
