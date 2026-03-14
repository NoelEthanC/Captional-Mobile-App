import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function EditorNavBar({ onBack, onNext }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {/* Back */}
      <Pressable
        onPress={onBack}
        className="bg-void-soft rounded-full px-4 py-2 active:opacity-70"
      >
        <Text className="text-canvas text-sm font-medium">← Back</Text>
      </Pressable>

      {/* Title */}
      <Text className="text-ink-muted text-xs font-semibold tracking-widest uppercase">
        Editor
      </Text>

      {/* Next */}
      <Pressable
        onPress={onNext}
        className="bg-canvas rounded-full px-4 py-2 active:opacity-70"
      >
        <Text className="text-ink text-sm font-bold">Next →</Text>
      </Pressable>
    </View>
  );
}
