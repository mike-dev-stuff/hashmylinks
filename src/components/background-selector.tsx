"use client";

import { useState } from "react";
import { Image as ImageIcon, Palette, Sparkles } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploadButton } from "@/components/image-upload-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CompactColorPicker } from "@/components/compact-color-picker";
import { ColorPresets } from "@/lib/color-presets";

interface ImagePreset {
  id: string;
  name: string;
  imageUrl: string;
}

interface BackgroundSelectorProps {
  label: string;
  imageValue: string;
  colorValue: string;
  onImageChange: (value: string) => void;
  onColorChange: (value: string) => void;
  presets: ImagePreset[];
}

export function BackgroundSelector({
  label,
  imageValue,
  colorValue,
  onImageChange,
  onColorChange,
  presets,
}: BackgroundSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <FormLabel>{label}</FormLabel>

      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="image">
            <ImageIcon className="h-4 w-4 mr-2" />
            Image
          </TabsTrigger>
          <TabsTrigger value="color">
            <Palette className="h-4 w-4 mr-2" />
            Color
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              value={imageValue || ""}
              onChange={(e) => {
                onImageChange(e.target.value);
                if (e.target.value) onColorChange("");
              }}
              placeholder="Enter image URL"
              className="flex-1"
            />
            <ImageUploadButton
              onUpload={(url) => {
                onImageChange(url);
                onColorChange("");
              }}
            />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="icon">
                  <Sparkles className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Select Preset Image</DialogTitle>
                  <DialogDescription>
                    Choose from our curated collection of backgrounds
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        onImageChange(preset.imageUrl);
                        onColorChange("");
                        setOpen(false);
                      }}
                      className="group relative aspect-video rounded-lg overflow-hidden border-2 hover:border-primary transition-colors"
                      style={{
                        borderColor: imageValue === preset.imageUrl ? 'hsl(var(--primary))' : 'transparent'
                      }}
                    >
                      <img
                        src={preset.imageUrl}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                        {preset.name}
                      </div>
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="color" className="space-y-2">
          <CompactColorPicker
            value={colorValue || ""}
            onChange={(color) => {
              onColorChange(color);
              if (color) onImageChange("");
            }}
            presets={ColorPresets}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
