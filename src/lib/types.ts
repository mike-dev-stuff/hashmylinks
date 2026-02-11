export interface LinkItem {
  id: string;
  title: string;
  url: string;
  backgroundUrl?: string;
  backgroundColor?: string;
}

export interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string;
  avatarShape?: 'circle' | 'square' | 'rounded';
  links: LinkItem[];
  pageBackgroundUrl?: string;
  pageBackgroundColor?: string;
  nameFont?: string;
  bioFont?: string;
  linksFont?: string;
  linksShape?: 'square' | 'rounded' | 'pill';
  nameColor?: string;
  bioColor?: string;
  linksColor?: string;
}
