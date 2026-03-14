import Colors from "@/constants/colors";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import Svg, { Line, Path, Polyline } from "react-native-svg";

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export default function SaveButton({ onPress, loading = false }: Props) {
  const { rs } = useResponsive();
  const iconSize = rs(18);

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="bg-ink flex-row items-center justify-center active:opacity-80"
      style={{
        marginHorizontal: rs(16),
        height: rs(56),
        borderRadius: rs(100),
        gap: rs(10),
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.canvas} />
      ) : (
        <>
          <Svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
          >
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
              x1="12"
              y1="15"
              x2="12"
              y2="3"
              stroke={Colors.canvas}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
          <Text className="text-canvas font-bold" style={{ fontSize: rs(16) }}>
            Save to Gallery
          </Text>
        </>
      )}
    </Pressable>
  );
}
