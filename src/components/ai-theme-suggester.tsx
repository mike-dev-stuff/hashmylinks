"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { suggestThemeFromDescription } from "@/ai/flows/theme-suggestion-from-description";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function AiThemeSuggester() {
  const [description, setDescription] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast({
        title: "Description is empty",
        description: "Please describe your profile to get suggestions.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setSuggestion("");
    try {
      const result = await suggestThemeFromDescription({
        profileDescription: description,
      });
      setSuggestion(result.themeSuggestions);
    } catch (error) {
      console.error("AI theme suggestion failed:", error);
      toast({
        title: "Suggestion Failed",
        description: "Could not generate theme suggestions at this time.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 />
          AI Theme Helper
        </CardTitle>
        <CardDescription>
          Describe your profile, and let AI suggest a theme for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., 'A portfolio for a graphic designer specializing in bold, modern branding.'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Generating..." : "Get Suggestions"}
          </Button>
        </form>
        {(isLoading || suggestion) && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Suggestion:</h4>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <Card className="bg-background">
                <CardContent className="p-4 text-sm whitespace-pre-wrap font-mono">
                  {suggestion}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
