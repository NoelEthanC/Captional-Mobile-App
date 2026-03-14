import Colors from "@/constants/colors";
import type { PickedPhoto } from "@/hooks/usePhotoPicker";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Line } from "react-native-svg";

type Props = {
  photos: PickedPhoto[];
  onPickMore: () => void;
  onSelectPhoto: (photo: PickedPhoto) => void;
};

function PlusIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        stroke={Colors.inkFaint}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke={Colors.inkFaint}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function RecentPhotos({
  photos,
  onPickMore,
  onSelectPhoto,
}: Props) {
  return (
    <View className="px-6 pb-8">
      <Text className="text-xs font-semibold tracking-widest text-ink-muted uppercase mb-3">
        Recent
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2"
      >
        {photos.map((photo, index) => (
          <Pressable
            key={`${photo.uri}-${index}`}
            onPress={() => onSelectPhoto(photo)}
            className="active:opacity-70"
          >
            <Image
              source={{ uri: photo.uri }}
              className="w-16 h-16 rounded-xl bg-overlay"
              resizeMode="cover"
            />
          </Pressable>
        ))}

        {/* Empty placeholder tiles when no photos yet */}
        {photos.length === 0 &&
          [0, 1, 2].map((i) => (
            <View
              key={i}
              className="w-16 h-16 rounded-xl bg-overlay"
              style={{ opacity: 1 - i * 0.25 }}
            />
          ))}

        {/* Add more button */}
        <Pressable
          onPress={onPickMore}
          className="w-16 h-16 rounded-xl border border-dashed border-ink-faint items-center justify-center active:opacity-70"
        >
          <PlusIcon />
        </Pressable>
      </ScrollView>
    </View>
  );
}
