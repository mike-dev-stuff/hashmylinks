"use client";

import { useState, useEffect } from "react";
import { Check, Copy, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { ProfileData } from "@/lib/types";

export function ShareProfile({ profileData }: { profileData: ProfileData }) {
  const [url, setUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const serialized = JSON.stringify(profileData);
        const encoded = btoa(serialized);
        const fullUrl = `${window.location.origin}/#${encoded}`;
        setUrl(fullUrl);
      } catch (error) {
        console.error("Failed to serialize profile data:", error);
        setUrl("Could not generate share link.");
      }
    }
  }, [profileData]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast({ title: "Copied to clipboard!" });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Your Profile</DialogTitle>
          <DialogDescription>
            Anyone with this link can view your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input value={url} readOnly className="flex-grow font-mono text-xs" />
            <Button size="icon" onClick={handleCopy}>
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">
              Recommended URL Shorteners
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              This URL can get quite long. Use a free URL shortener to make it easier to share:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://bitly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
              >
                <span className="font-medium">Bitly</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
              <a
                href="https://tinyurl.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
              >
                <span className="font-medium">TinyURL</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
              <a
                href="https://short.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
              >
                <span className="font-medium">Short.io</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
              <a
                href="https://rebrandly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
              >
                <span className="font-medium">Rebrandly</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
              <a
                href="https://is.gd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
              >
                <span className="font-medium">Is.gd</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
              <a
                href="https://t.ly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-md border hover:bg-accent transition-colors text-sm"
              >
                <span className="font-medium">T.ly</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
