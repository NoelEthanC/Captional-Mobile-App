import FormatPicker, {
  type ImageFormat,
} from "@/components/preview/FormatPicker";
import PreviewImage from "@/components/preview/PreviewImage";
import PreviewNavBar from "@/components/preview/PreviewNavBar";
import SaveButton from "@/components/preview/SaveButton";
import ShareButton from "@/components/preview/ShareButton";
import SafeScreen from "@/components/ui/SafeScreen";
import { useExportImage } from "@/hooks/useExportImage";
import type {
  CaptionOverlay,
  CaptionPosition,
  CaptionStyle,
} from "@/types/editor";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

export default function PreviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    uri: string;
    caption: string;
    position: CaptionPosition;
    style: CaptionStyle;
    overlay: CaptionOverlay;
  }>();

  const [format, setFormat] = useState<ImageFormat>("png");
  const { viewRef, saving, sharing, saveToGallery, shareImage } =
    useExportImage();

  return (
    <SafeScreen>
      <PreviewNavBar onBack={() => router.back()} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Final image — ref attached here for capture */}
        <PreviewImage
          ref={viewRef}
          uri={params.uri ?? ""}
          caption={params.caption ?? ""}
          position={params.position ?? "bottom"}
          style={params.style ?? "bold"}
          overlay={params.overlay ?? "gradient"}
        />

        {/* Format selector */}
        <FormatPicker value={format} onChange={setFormat} />

        {/* Action buttons */}
        <View className="gap-3">
          <SaveButton onPress={() => saveToGallery(format)} loading={saving} />
          <ShareButton onPress={() => shareImage(format)} loading={sharing} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
