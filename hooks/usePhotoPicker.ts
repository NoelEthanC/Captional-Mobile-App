import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";

export type PickedPhoto = {
  uri: string;
  width: number;
  height: number;
  fileName?: string;
};

export function usePhotoPicker() {
  const [recentPhotos, setRecentPhotos] = useState<PickedPhoto[]>([]);

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

    // Prepend to recent list, keep last 6
    setRecentPhotos((prev) => [photo, ...prev].slice(0, 6));

    return photo;
  }, []);

  return { pickPhoto, recentPhotos };
}
