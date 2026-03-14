import { useCallback, useRef, useState } from "react";
import { Alert, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import ViewShot, { captureRef } from "react-native-view-shot";
import type { ImageFormat } from "@/components/preview/FormatPicker";

export function useExportImage() {
  const viewRef = useRef<View>(null);
  const [saving, setSaving]   = useState(false);
  const [sharing, setSharing] = useState(false);

  // Capture the view as a temp file URI
  const capture = useCallback(
    async (format: ImageFormat): Promise<string | null> => {
      try {
        const uri = await captureRef(viewRef, {
          format:  format === "png" ? "png" : "jpg",
          quality: 1,
        });
        return uri;
      } catch (e) {
        console.error("Capture failed", e);
        return null;
      }
    },
    []
  );

  const saveToGallery = useCallback(
    async (format: ImageFormat) => {
      setSaving(true);
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Please allow access to your photo library in Settings."
          );
          return;
        }

        const uri = await capture(format);
        if (!uri) throw new Error("Capture returned null");

        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Saved!", "Your captioned photo is in your gallery.");
      } catch (e) {
        Alert.alert("Error", "Something went wrong while saving.");
        console.error(e);
      } finally {
        setSaving(false);
      }
    },
    [capture]
  );

  const shareImage = useCallback(
    async (format: ImageFormat) => {
      setSharing(true);
      try {
        const isAvailable = await Sharing.isAvailableAsync();
        if (!isAvailable) {
          Alert.alert("Sharing not available", "Your device doesn't support sharing.");
          return;
        }

        const uri = await capture(format);
        if (!uri) throw new Error("Capture returned null");

        await Sharing.shareAsync(uri, {
          mimeType: format === "png" ? "image/png" : "image/jpeg",
          dialogTitle: "Share your captioned photo",
        });
      } catch (e) {
        Alert.alert("Error", "Something went wrong while sharing.");
        console.error(e);
      } finally {
        setSharing(false);
      }
    },
    [capture]
  );

  return { viewRef, saving, sharing, saveToGallery, shareImage };
}
