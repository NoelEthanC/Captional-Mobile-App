import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function EditorNavBar({ onBack, onNext }: Props) {
  const { rs, hp } = useResponsive();

  return (
    <View
      className="flex-row items-center justify-between"
      style={{ paddingHorizontal: rs(16), paddingVertical: hp(0.018) }}
    >
      <Pressable
        onPress={onBack}
        className="bg-void-soft rounded-full active:opacity-70"
        style={{ paddingHorizontal: rs(16), paddingVertical: rs(9) }}
      >
        <Text className="text-canvas font-medium" style={{ fontSize: rs(14) }}>
          ← Back
        </Text>
      </Pressable>

      <Text
        className="text-ink-muted font-semibold uppercase tracking-widest"
        style={{ fontSize: rs(11), letterSpacing: 2 }}
      >
        Editor
      </Text>

      <Pressable
        onPress={onNext}
        className="bg-canvas rounded-full active:opacity-70"
        style={{ paddingHorizontal: rs(16), paddingVertical: rs(9) }}
      >
        <Text className="text-ink font-bold" style={{ fontSize: rs(14) }}>
          Next →
        </Text>
      </Pressable>
    </View>
  );
}
