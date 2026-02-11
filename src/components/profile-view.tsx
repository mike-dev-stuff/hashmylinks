import type { ProfileData } from "@/lib/types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LinkCard = ({
  title,
  url,
  index,
}: {
  title: string;
  url: string;
  index: number;
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block animate-fade-in"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <Button
      variant="outline"
      className="w-full h-14 text-lg justify-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-card/80 hover:bg-card"
    >
      {title}
    </Button>
  </a>
);

export function ProfileView({ profile }: { profile: ProfileData }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 pt-12">
      <header className="flex flex-col items-center text-center mb-10">
        <Avatar className="w-24 h-24 mb-4 border-4 border-card shadow-lg">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="abstract person" />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold font-headline text-primary">
          {profile.name}
        </h1>
        {profile.bio && (
          <p className="mt-2 max-w-xl text-muted-foreground">{profile.bio}</p>
        )}
      </header>
      <main className="w-full max-w-md space-y-4">
        {profile.links.map((link, index) => (
          <LinkCard key={link.id} title={link.title} url={link.url} index={index} />
        ))}
      </main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Powered by HashMyLinks</p>
      </footer>
    </div>
  );
}
