"use client";

import { useState, useEffect } from "react";
import type { ProfileData } from "@/lib/types";
import { LandingView } from "@/components/landing-view";
import { ProfileView } from "@/components/profile-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const decoded = atob(hash);
        const data = JSON.parse(decoded);
        setProfile(data);
      }
    } catch (e) {
      console.error("Failed to parse profile data from hash", e);
      setError("Could not load the profile. The link may be corrupted.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Skeleton className="h-24 w-24 rounded-full mb-4" />
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-6 w-64 mb-8" />
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-destructive">
        {error}
      </div>
    );
  }

  if (profile) {
    return <ProfileView profile={profile} />;
  }

  return <LandingView />;
}
