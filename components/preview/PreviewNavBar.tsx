import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  onBack: () => void;
};

export default function PreviewNavBar({ onBack }: Props) {
  const { rs, hp } = useResponsive();

  return (
    <View
      className="flex-row items-center justify-between"
      style={{ paddingHorizontal: rs(16), paddingVertical: hp(0.018) }}
    >
      <Pressable
        onPress={onBack}
        className="bg-overlay rounded-full active:opacity-70"
        style={{ paddingHorizontal: rs(16), paddingVertical: rs(9) }}
      >
        <Text className="text-ink font-medium" style={{ fontSize: rs(14) }}>
          ← Edit
        </Text>
      </Pressable>

      <Text
        className="text-ink-muted font-semibold uppercase tracking-widest"
        style={{ fontSize: rs(11), letterSpacing: 2 }}
      >
        Preview
      </Text>

      {/* Spacer to keep title centred */}
      <View style={{ width: rs(72) }} />
    </View>
  );
}
