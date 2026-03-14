import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide as soon as the root layout has mounted —
    // fonts, navigation, and SafeAreaContext are all ready by this point.
    SplashScreen.hideAsync();
  }, []);
  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="editor"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="preview"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
