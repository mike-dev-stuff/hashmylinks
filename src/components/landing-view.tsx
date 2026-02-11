import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LandingView() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-2xl w-full">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-5xl font-bold font-headline text-primary">
            H#shMyLinks
          </h1>
        </div>
        <p className="text-lg text-muted-foreground mb-8">
          Like Linktree, but actually free. No accounts, no servers, no limits.
          Your entire profile lives in the URL hash—permanent and portable.
        </p>
        <Link
          href="/edit"
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <ArrowRight className="w-8 h-8" />
        </Link>
      </div>
    </main>
  );
}
