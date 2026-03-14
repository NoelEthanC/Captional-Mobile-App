import Colors from "@/constants/colors";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Line, Path, Polyline } from "react-native-svg";

type Props = {
  onPress: () => void;
};

function UploadIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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
  const { hp, rs } = useResponsive();

  return (
    <Pressable
      onPress={onPress}
      className="bg-overlay border-ink-faint items-center justify-center active:opacity-70"
      style={{
        marginHorizontal: rs(24),
        borderRadius: rs(24),
        borderWidth: 1.5,
        borderStyle: "dashed",
        paddingVertical: hp(0.15),
        gap: rs(16),
      }}
    >
      {/* Icon tile */}
      <View
        className="bg-ink items-center justify-center"
        style={{
          width: rs(64),
          height: rs(64),
          borderRadius: rs(18),
        }}
      >
        <UploadIcon size={rs(26)} />
      </View>

      {/* Labels */}
      <View className="items-center" style={{ gap: rs(4) }}>
        <Text className="font-semibold text-ink" style={{ fontSize: rs(16) }}>
          Upload a photo to Add Caption
        </Text>
        <Text className="text-ink-muted" style={{ fontSize: rs(13) }}>
          JPG or PNG from your gallery
        </Text>
      </View>
    </Pressable>
  );
}
