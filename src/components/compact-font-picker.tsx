"use client";

import { GoogleFont } from "@/lib/google-fonts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompactFontPickerProps {
  value: string;
  onChange: (value: string) => void;
  fonts: GoogleFont[];
}

export function CompactFontPicker({ value, onChange, fonts }: CompactFontPickerProps) {
  return (
    <div className="w-64">
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select font" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {fonts.map((font) => (
            <SelectItem
              key={font.id}
              value={font.family}
              style={{
                fontFamily: `'${font.family}', ${font.category}`,
              }}
            >
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
