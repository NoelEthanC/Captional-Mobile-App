import Colors from "@/constants/colors";
import type { PickedPhoto } from "@/hooks/usePhotoPicker";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Line } from "react-native-svg";

type Props = {
  photos: PickedPhoto[];
  loading?: boolean;
  onPickMore: () => void;
  onSelectPhoto: (photo: PickedPhoto) => void;
};

function PlusIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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
  loading = false,
  onPickMore,
  onSelectPhoto,
}: Props) {
  const { rs, hp } = useResponsive();
  const thumbSize = rs(72);
  const thumbRadius = rs(14);

  return (
    <View style={{ paddingHorizontal: rs(24), paddingBottom: hp(0.05) }}>
      <Text
        className="font-semibold uppercase tracking-widest text-ink-muted"
        style={{ fontSize: rs(11), letterSpacing: 1.8, marginBottom: rs(12) }}
      >
        Recent
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: rs(11) }}
      >
        {/* Loading skeletons */}
        {loading &&
          [0, 1, 2].map((i) => (
            <View
              key={i}
              className="bg-overlay"
              style={{
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbRadius,
                opacity: 1 - i * 0.25,
              }}
            />
          ))}

        {/* Actual photos */}
        {!loading &&
          photos.map((photo, index) => (
            <Pressable
              key={`${photo.uri}-${index}`}
              onPress={() => onSelectPhoto(photo)}
              className="active:opacity-70"
            >
              <Image
                source={{ uri: photo.uri }}
                className="bg-overlay"
                style={{
                  width: thumbSize,
                  height: thumbSize,
                  borderRadius: thumbRadius,
                }}
                resizeMode="cover"
              />
            </Pressable>
          ))}

        {/* Empty placeholders */}
        {!loading &&
          photos.length === 0 &&
          [0, 1, 2].map((i) => (
            <View
              key={i}
              className="bg-overlay"
              style={{
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbRadius,
                opacity: 1 - i * 0.25,
              }}
            />
          ))}

        {/* Add more button */}
        {!loading && (
          <Pressable
            onPress={onPickMore}
            className="border-ink-faint items-center justify-center active:opacity-70"
            style={{
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbRadius,
              borderWidth: 1.5,
              borderStyle: "dashed",
            }}
          >
            <PlusIcon size={rs(20)} />
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}
