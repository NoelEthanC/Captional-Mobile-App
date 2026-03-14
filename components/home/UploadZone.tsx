import Colors from "@/constants/colors";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Line, Path, Polyline } from "react-native-svg";

type Props = {
  onPress: () => void;
};

function UploadIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        stroke={Colors.canvas}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="17 8 12 3 7 8"
        stroke={Colors.canvas}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="12"
        y1="3"
        x2="12"
        y2="15"
        stroke={Colors.canvas}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function UploadZone({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="mx-6 rounded-3xl border border-dashed border-ink-faint bg-overlay items-center justify-center py-12 gap-4 active:opacity-70"
    >
      {/* Icon tile */}
      <View className="w-14 h-14 rounded-2xl bg-ink items-center justify-center">
        <UploadIcon />
      </View>

      {/* Labels */}
      <View className="items-center gap-1">
        <Text className="text-base font-semibold text-ink">Upload a photo</Text>
        <Text className="text-sm text-ink-muted">
          JPG or PNG from your gallery
        </Text>
      </View>
    </Pressable>
  );
}
