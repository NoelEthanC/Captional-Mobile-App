import React from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { useResponsive } from "@/hooks/useResponsive";
import Colors from "@/constants/colors";

type Props = {
  onGoBack: () => void;
};

function BrokenImageIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3" y="3" width="18" height="18" rx="3"
        stroke={Colors.inkMuted}
        strokeWidth={1.5}
      />
      <Circle cx="8.5" cy="8.5" r="1.5" fill={Colors.inkMuted} />
      <Path
        d="M3 15l5-5 4 4 3-3 6 6"
        stroke={Colors.inkMuted}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 2l20 20"
        stroke={Colors.inkFaint}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function EmptyState({ onGoBack }: Props) {
  const { rs } = useResponsive();

  return (
    <View
      className="flex-1 bg-void items-center justify-center"
      style={{ paddingHorizontal: rs(32), gap: rs(20) }}
    >
      {/* Icon tile */}
      <View
        className="bg-void-soft items-center justify-center"
        style={{
          width:        rs(80),
          height:       rs(80),
          borderRadius: rs(22),
          borderWidth:  1,
          borderColor:  Colors.voidBorder,
        }}
      >
        <BrokenImageIcon size={rs(36)} />
      </View>

      {/* Copy */}
      <View className="items-center" style={{ gap: rs(8) }}>
        <Text
          className="text-canvas font-bold text-center"
          style={{ fontSize: rs(20), fontFamily: "serif" }}
        >
          No photo selected
        </Text>
        <Text
          className="text-ink-muted text-center"
          style={{ fontSize: rs(14), lineHeight: rs(22) }}
        >
          It looks like you arrived here without choosing a photo. Go back and pick one from your gallery.
        </Text>
      </View>

      {/* Go back CTA */}
      <Pressable
        onPress={onGoBack}
        className="bg-canvas items-center justify-center active:opacity-80"
        style={{
          marginTop:         rs(8),
          height:            rs(52),
          borderRadius:      rs(100),
          paddingHorizontal: rs(36),
        }}
      >
        <Text
          className="text-ink font-bold"
          style={{ fontSize: rs(15) }}
        >
          ← Choose a Photo
        </Text>
      </Pressable>
    </View>
  );
}
