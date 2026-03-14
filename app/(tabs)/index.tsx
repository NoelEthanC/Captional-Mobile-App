import ChoosePhotoButton from "@/components/home/ChoosePhotoButton";
import HomeHeader from "@/components/home/HomeHeader";
import RecentPhotos from "@/components/home/RecentPhotos";
import UploadZone from "@/components/home/UploadZone";
import SafeScreen from "@/components/ui/SafeScreen";
import { usePhotoPicker, type PickedPhoto } from "@/hooks/usePhotoPicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { pickPhoto, recentPhotos } = usePhotoPicker();
  const [loading, setLoading] = useState(false);

  const handlePickPhoto = async () => {
    setLoading(true);
    const photo = await pickPhoto();
    setLoading(false);

    if (photo) {
      // Navigate to editor, pass uri as param
      router.push({
        pathname: "/editor",
        params: { uri: photo.uri, width: photo.width, height: photo.height },
      });
    }
  };

  const handleSelectRecent = (photo: PickedPhoto) => {
    router.push({
      pathname: "/editor",
      params: { uri: photo.uri, width: photo.width, height: photo.height },
    });
  };

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-between"
        showsVerticalScrollIndicator={false}
      >
        {/* Top section */}
        <View className="gap-6">
          <HomeHeader />
          <UploadZone onPress={handlePickPhoto} />
          <ChoosePhotoButton onPress={handlePickPhoto} loading={loading} />
        </View>

        {/* Bottom section — recent photos */}
        <RecentPhotos
          photos={recentPhotos}
          onPickMore={handlePickPhoto}
          onSelectPhoto={handleSelectRecent}
        />
      </ScrollView>
    </SafeScreen>
  );
}
