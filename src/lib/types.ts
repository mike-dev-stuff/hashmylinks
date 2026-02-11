export interface LinkItem {
  id: string;
  title: string;
  url: string;
}

export interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string;
  links: LinkItem[];
}
