// app/AuthRedirect.tsx
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) router.replace("/(auth)/sign-in");
  }, [isLoaded, isSignedIn]);

  return <>{children}</>;
}
