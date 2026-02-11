import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type ImagePreset = {
  id: string;
  name: string;
  imageUrl: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export const getPageBackgroundPresets = (): ImagePreset[] => {
  return PlaceHolderImages.filter(img => img.id.startsWith('page-bg-')).map(img => ({
    id: img.id,
    name: img.description,
    imageUrl: img.imageUrl,
  }));
};

export const getButtonBackgroundPresets = (): ImagePreset[] => {
  return PlaceHolderImages.filter(img => img.id.startsWith('button-bg-')).map(img => ({
    id: img.id,
    name: img.description,
    imageUrl: img.imageUrl,
  }));
};

export const getAvatarPresets = (): ImagePlaceholder[] => {
  return PlaceHolderImages.filter(img => img.id.startsWith('avatar-'));
};
