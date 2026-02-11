"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Link as LinkIcon,
  Plus,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ProfileData } from "@/lib/types";
import { ProfileView } from "@/components/profile-view";
import { AiThemeSuggester } from "@/components/ai-theme-suggester";
import { Separator } from "@/components/ui/separator";
import { ShareProfile } from "@/components/share-profile";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/icons";

const linkSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required."),
  url: z.string().url("Please enter a valid URL."),
});

const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  bio: z.string().max(200, "Bio can be up to 200 characters.").optional(),
  avatarUrl: z.string().url(),
  links: z.array(linkSchema),
});

const defaultAvatar =
  PlaceHolderImages.find((img) => img.id === "avatar-placeholder")?.imageUrl ||
  "";

const defaultValues: ProfileData = {
  name: "Your Name",
  bio: "A short and catchy bio about yourself.",
  avatarUrl: defaultAvatar,
  links: [{ id: "1", title: "My Personal Website", url: "https://example.com" }],
};

export function EditorView() {
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const watchedProfile = form.watch();

  return (
    <Form {...form}>
      <div className="min-h-screen md:grid md:grid-cols-2">
        <div className="flex flex-col">
          <header className="p-4 border-b flex justify-between items-center bg-card">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <ShareProfile profileData={watchedProfile} />
          </header>
          <ScrollArea className="flex-grow">
            <form className="p-6 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User />
                    Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A short description about you"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon />
                    Your Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-start gap-2 p-4 border rounded-lg bg-background"
                    >
                      <div className="flex-grow space-y-2">
                        <FormField
                          control={form.control}
                          name={`links.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="sr-only">Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Link Title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`links.${index}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="sr-only">URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      append({ id: Date.now().toString(), title: "", url: "" })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </CardContent>
              </Card>
              <Separator />
              <AiThemeSuggester />
            </form>
          </ScrollArea>
        </div>
        <div className="hidden md:block bg-muted/30 border-l relative">
          <div className="absolute top-0 left-0 right-0 bottom-0">
             <ProfileView profile={watchedProfile} />
          </div>
        </div>
      </div>
    </Form>
  );
}
