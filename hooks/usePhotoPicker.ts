import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";

export type PickedPhoto = {
  uri: string;
  width: number;
  height: number;
  fileName?: string;
};

const STORAGE_KEY = "captional:recent_photos";
const MAX_RECENTS = 6;

async function loadStoredPhotos(): Promise<PickedPhoto[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PickedPhoto[]) : [];
  } catch {
    return [];
  }
}

async function persistPhotos(photos: PickedPhoto[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch {
    // Silently fail — UI still works, just won't persist this session
  }
}

export function usePhotoPicker() {
  const [recentPhotos, setRecentPhotos] = useState<PickedPhoto[]>([]);
  const [loadingRecents, setLoadingRecents] = useState(true);

  // Load persisted photos on mount
  useEffect(() => {
    loadStoredPhotos().then((photos) => {
      setRecentPhotos(photos);
      setLoadingRecents(false);
    });
  }, []);

  const pickPhoto = useCallback(async (): Promise<PickedPhoto | null> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled || !result.assets[0]) return null;

    const asset = result.assets[0];
    const photo: PickedPhoto = {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileName: asset.fileName ?? undefined,
    };

    // Prepend, deduplicate by URI, cap at MAX_RECENTS
    setRecentPhotos((prev) => {
      const deduped = [photo, ...prev.filter((p) => p.uri !== photo.uri)].slice(
        0,
        MAX_RECENTS,
      );
      persistPhotos(deduped); // fire-and-forget
      return deduped;
    });

    return photo;
  }, []);

  const clearRecents = useCallback(async () => {
    setRecentPhotos([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return { pickPhoto, recentPhotos, loadingRecents, clearRecents };
}
