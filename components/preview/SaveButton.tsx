import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Svg, { Line, Path, Polyline } from "react-native-svg";
import Colors from "@/constants/colors";

function DownloadIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        stroke={Colors.canvas}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="7 10 12 15 17 10"
        stroke={Colors.canvas}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="12" y1="15" x2="12" y2="3"
        stroke={Colors.canvas}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export default function SaveButton({ onPress, loading = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="mx-4 h-14 rounded-full bg-ink flex-row items-center justify-center gap-2 active:opacity-80"
    >
      {loading ? (
        <ActivityIndicator color={Colors.canvas} />
      ) : (
        <>
          <DownloadIcon />
          <Text className="text-canvas text-base font-bold">
            Save to Gallery
          </Text>
        </>
      )}
    </Pressable>
  );
}
