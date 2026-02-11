import type { ProfileData } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { getFontByFamily } from "@/lib/google-fonts";

const LinkCard = ({
  title,
  url,
  index,
  backgroundUrl,
  backgroundColor,
  linkFont,
  linkColor,
  linkShape,
}: {
  title: string;
  url: string;
  index: number;
  backgroundUrl?: string;
  backgroundColor?: string;
  linkFont?: string;
  linkColor?: string;
  linkShape?: 'square' | 'rounded' | 'pill';
}) => {
  const hasBackground = backgroundUrl || backgroundColor;

  const buttonStyle: React.CSSProperties = {};
  if (backgroundUrl) {
    buttonStyle.backgroundImage = `url(${backgroundUrl})`;
    buttonStyle.backgroundSize = 'cover';
    buttonStyle.backgroundPosition = 'center';
  } else if (backgroundColor) {
    buttonStyle.backgroundColor = backgroundColor;
  }

  const shapeClass = linkShape === 'pill'
    ? 'rounded-full'
    : linkShape === 'square'
      ? 'rounded-sm'
      : 'rounded-lg';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Button
        variant="outline"
        className={`w-full h-14 text-lg justify-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${shapeClass} ${
          hasBackground
            ? 'backdrop-blur-sm bg-white/80 hover:bg-white/90 text-foreground border-2'
            : 'bg-card/80 hover:bg-card'
        }`}
        style={buttonStyle}
      >
        <span
          className={hasBackground ? 'drop-shadow-sm font-semibold' : ''}
          style={{
            fontFamily: linkFont ? `'${linkFont}', sans-serif` : undefined,
            color: linkColor || undefined,
          }}
        >
          {title}
        </span>
      </Button>
    </a>
  );
};

export function ProfileView({ profile }: { profile: ProfileData }) {
  const loadedFonts = useRef(new Set<string>());

  useEffect(() => {
    const fontsToLoad = new Set<string>();

    if (profile.nameFont) fontsToLoad.add(profile.nameFont);
    if (profile.bioFont) fontsToLoad.add(profile.bioFont);
    if (profile.linksFont) fontsToLoad.add(profile.linksFont);

    fontsToLoad.forEach(fontFamily => {
      if (!loadedFonts.current.has(fontFamily)) {
        const fontData = getFontByFamily(fontFamily);
        if (fontData) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = fontData.googleFontsUrl;
          document.head.appendChild(link);
          loadedFonts.current.add(fontFamily);
        }
      }
    });
  }, [profile.nameFont, profile.bioFont, profile.linksFont]);

  const pageStyle: React.CSSProperties = {};
  const hasPageBackground = profile.pageBackgroundUrl || profile.pageBackgroundColor;

  if (profile.pageBackgroundUrl) {
    pageStyle.backgroundImage = `url(${profile.pageBackgroundUrl})`;
    pageStyle.backgroundSize = 'cover';
    pageStyle.backgroundPosition = 'center';
    pageStyle.backgroundAttachment = 'fixed';
  } else if (profile.pageBackgroundColor) {
    pageStyle.backgroundColor = profile.pageBackgroundColor;
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-4 pt-12 relative"
      style={pageStyle}
    >
      {profile.pageBackgroundUrl && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      )}

      <div className="relative z-10 w-full flex flex-col items-center">
        <header className="flex flex-col items-center text-center mb-10">
          <Avatar
            className={`w-24 h-24 mb-4 border-4 border-card shadow-lg ${
              profile.avatarShape === 'square'
                ? 'rounded-none'
                : profile.avatarShape === 'rounded'
                  ? 'rounded-xl'
                  : 'rounded-full'
            }`}
          >
            <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="abstract person" />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1
            className="text-3xl font-bold font-headline"
            style={{
              fontFamily: profile.nameFont ? `'${profile.nameFont}', sans-serif` : undefined,
              color: profile.nameColor || undefined,
            }}
          >
            {profile.name}
          </h1>
          {profile.bio && (
            <p
              className="mt-2 max-w-xl"
              style={{
                fontFamily: profile.bioFont ? `'${profile.bioFont}', sans-serif` : undefined,
                color: profile.bioColor || undefined,
              }}
            >
              {profile.bio}
            </p>
          )}
        </header>
        <main className="w-full max-w-md space-y-4">
          {profile.links.map((link, index) => (
            <LinkCard
              key={link.id}
              title={link.title}
              url={link.url}
              index={index}
              backgroundUrl={link.backgroundUrl}
              backgroundColor={link.backgroundColor}
              linkFont={profile.linksFont}
              linkColor={profile.linksColor}
              linkShape={profile.linksShape}
            />
          ))}
        </main>
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Powered by HashMyLinks</p>
        </footer>
      </div>
    </div>
  );
}
