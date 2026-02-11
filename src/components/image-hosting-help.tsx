"use client";

import { HelpCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ImageHostingHelp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <HelpCircle className="h-3 w-3" />
          Need an image URL?
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-1">Image Hosting</h4>
            <p className="text-xs text-muted-foreground">
              Upload your images to a free hosting service to get a URL:
            </p>
          </div>
          <div className="space-y-1.5">
            <a
              href="https://imgur.com/upload"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium">Imgur</span>
                <span className="text-xs text-muted-foreground">Popular, no account needed</span>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </a>
            <a
              href="https://imgbb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium">ImgBB</span>
                <span className="text-xs text-muted-foreground">Simple and fast</span>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </a>
            <a
              href="https://postimages.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium">Postimages</span>
                <span className="text-xs text-muted-foreground">Free, no registration required</span>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </a>
          </div>
          <div className="border-t pt-2">
            <p className="text-xs text-muted-foreground">
              <strong>Tip:</strong> After uploading, right-click the image and select "Copy image address" to get the URL.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
