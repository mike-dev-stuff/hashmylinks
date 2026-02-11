"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  ArrowLeft,
  Link as LinkIcon,
  Palette,
  Plus,
  Shapes,
  Trash2,
  Type,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ProfileData } from "@/lib/types";
import { ProfileView } from "@/components/profile-view";
import { ShareProfile } from "@/components/share-profile";
import { PlaceHolderImages, getPageBackgroundPresets, getButtonBackgroundPresets } from "@/lib/placeholder-images";
import { BackgroundSelector } from "@/components/background-selector";
import { GoogleFonts } from "@/lib/google-fonts";
import { ColorPresets } from "@/lib/color-presets";
import { CompactFontPicker } from "@/components/compact-font-picker";
import { CompactColorPicker } from "@/components/compact-color-picker";
import { ImageUploadButton } from "@/components/image-upload-button";

const linkSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required."),
  url: z.string().url("Please enter a valid URL."),
  backgroundUrl: z.string().url().optional().or(z.literal("")),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().or(z.literal("")),
});

const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  bio: z.string().max(200, "Bio can be up to 200 characters.").optional(),
  avatarUrl: z.string().url(),
  avatarShape: z.enum(['circle', 'square', 'rounded']).optional(),
  links: z.array(linkSchema),
  pageBackgroundUrl: z.string().url().optional().or(z.literal("")),
  pageBackgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().or(z.literal("")),
  nameFont: z.string().optional().or(z.literal("")),
  bioFont: z.string().optional().or(z.literal("")),
  linksFont: z.string().optional().or(z.literal("")),
  linksShape: z.enum(['square', 'rounded', 'pill']).optional(),
  nameColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().or(z.literal("")),
  bioColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().or(z.literal("")),
  linksColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().or(z.literal("")),
});

const defaultAvatar =
  PlaceHolderImages.find((img) => img.id === "avatar-placeholder")?.imageUrl ||
  "";

const defaultValues: ProfileData = {
  name: "Your Name",
  bio: "A short and catchy bio about yourself.",
  avatarUrl: defaultAvatar,
  avatarShape: 'circle',
  links: [{ id: "1", title: "My Personal Website", url: "https://example.com" }],
  pageBackgroundUrl: "",
  pageBackgroundColor: "",
  nameFont: "",
  bioFont: "",
  linksFont: "",
  linksShape: 'rounded',
  nameColor: "",
  bioColor: "",
  linksColor: "",
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
      <div className="min-h-screen md:grid md:grid-cols-[30%_70%]">
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
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel>Name</FormLabel>
                          <div className="flex gap-1">
                            <FormField
                              control={form.control}
                              name="nameFont"
                              render={({ field: fontField }) => (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                                      <Type className="h-4 w-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <CompactFontPicker
                                      value={fontField.value || ""}
                                      onChange={fontField.onChange}
                                      fonts={GoogleFonts}
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="nameColor"
                              render={({ field: colorField }) => (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                                      <Palette className="h-4 w-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <CompactColorPicker
                                      value={colorField.value || ""}
                                      onChange={colorField.onChange}
                                      presets={ColorPresets}
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                          </div>
                        </div>
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
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel>Bio</FormLabel>
                          <div className="flex gap-1">
                            <FormField
                              control={form.control}
                              name="bioFont"
                              render={({ field: fontField }) => (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                                      <Type className="h-4 w-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <CompactFontPicker
                                      value={fontField.value || ""}
                                      onChange={fontField.onChange}
                                      fonts={GoogleFonts}
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="bioColor"
                              render={({ field: colorField }) => (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                                      <Palette className="h-4 w-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <CompactColorPicker
                                      value={colorField.value || ""}
                                      onChange={colorField.onChange}
                                      presets={ColorPresets}
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                          </div>
                        </div>
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
                  <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture URL</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input placeholder="https://example.com/image.jpg" {...field} className="flex-1" />
                            <ImageUploadButton onUpload={field.onChange} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="avatarShape"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar Shape</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant={field.value === 'circle' || !field.value ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => field.onChange('circle')}
                            >
                              Circle
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === 'rounded' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => field.onChange('rounded')}
                            >
                              Rounded
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === 'square' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => field.onChange('square')}
                            >
                              Square
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pageBackgroundUrl"
                    render={({ field: urlField }) => (
                      <FormField
                        control={form.control}
                        name="pageBackgroundColor"
                        render={({ field: colorField }) => (
                          <FormItem>
                            <FormControl>
                              <BackgroundSelector
                                label="Page Background"
                                imageValue={urlField.value || ""}
                                colorValue={colorField.value || ""}
                                onImageChange={urlField.onChange}
                                onColorChange={colorField.onChange}
                                presets={getPageBackgroundPresets()}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon />
                      Your Links
                    </CardTitle>
                    <div className="flex gap-1">
                      <FormField
                        control={form.control}
                        name="linksFont"
                        render={({ field: fontField }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                                <Type className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <CompactFontPicker
                                value={fontField.value || ""}
                                onChange={fontField.onChange}
                                fonts={GoogleFonts}
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="linksColor"
                        render={({ field: colorField }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                                <Palette className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <CompactColorPicker
                                value={colorField.value || ""}
                                onChange={colorField.onChange}
                                presets={ColorPresets}
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="linksShape"
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" type="button" className="h-8 w-8">
                                <Shapes className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="w-64 p-2 space-y-2">
                                <p className="text-sm font-medium mb-3">Button Shape</p>
                                <div className="space-y-2">
                                  <Button
                                    type="button"
                                    variant={field.value === 'rounded' || !field.value ? 'default' : 'outline'}
                                    className="w-full"
                                    onClick={() => field.onChange('rounded')}
                                  >
                                    Rounded
                                  </Button>
                                  <Button
                                    type="button"
                                    variant={field.value === 'pill' ? 'default' : 'outline'}
                                    className="w-full rounded-full"
                                    onClick={() => field.onChange('pill')}
                                  >
                                    Pill
                                  </Button>
                                  <Button
                                    type="button"
                                    variant={field.value === 'square' ? 'default' : 'outline'}
                                    className="w-full rounded-sm"
                                    onClick={() => field.onChange('square')}
                                  >
                                    Square
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-start gap-2 p-4 border rounded-lg bg-background"
                    >
                      <div className="flex-grow space-y-3">
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
                        <FormField
                          control={form.control}
                          name={`links.${index}.backgroundUrl`}
                          render={({ field: urlField }) => (
                            <FormField
                              control={form.control}
                              name={`links.${index}.backgroundColor`}
                              render={({ field: colorField }) => (
                                <FormItem>
                                  <FormControl>
                                    <BackgroundSelector
                                      label="Link Background"
                                      imageValue={urlField.value || ""}
                                      colorValue={colorField.value || ""}
                                      onImageChange={urlField.onChange}
                                      onColorChange={colorField.onChange}
                                      presets={getButtonBackgroundPresets()}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
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
                      append({ id: Date.now().toString(), title: "", url: "", backgroundUrl: "", backgroundColor: "" })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </CardContent>
              </Card>
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
