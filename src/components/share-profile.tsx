"use client";

import { useState, useEffect } from "react";
import { Check, Copy, Share2 } from "lucide-react";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Profile</DialogTitle>
          <DialogDescription>
            Anyone with this link can view your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={url} readOnly className="flex-grow" />
          <Button size="icon" onClick={handleCopy}>
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
