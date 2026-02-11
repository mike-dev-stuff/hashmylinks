import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";

export function LandingView() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-2xl w-full">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Logo className="w-12 h-12 text-primary" />
          <h1 className="text-5xl font-bold font-headline text-primary">
            HashMyLinks
          </h1>
        </div>
        <p className="text-lg text-muted-foreground mb-8">
          All your links, one simple and elegant page. Create your personalized
          profile in seconds, stored entirely in the URL. No backend, no
          databases, just you and your links.
        </p>
        <Button asChild size="lg">
          <Link href="/edit">Create Your Free Page</Link>
        </Button>
      </div>
    </main>
  );
}
