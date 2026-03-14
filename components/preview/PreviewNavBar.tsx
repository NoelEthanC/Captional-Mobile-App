import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  onBack: () => void;
};

export default function PreviewNavBar({ onBack }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Pressable
        onPress={onBack}
        className="bg-overlay rounded-full px-4 py-2 active:opacity-70"
      >
        <Text className="text-ink text-sm font-medium">← Edit</Text>
      </Pressable>

      <Text className="text-ink-muted text-xs font-semibold tracking-widest uppercase">
        Preview
      </Text>

      {/* Spacer to keep title centred */}
      <View style={{ width: 72 }} />
    </View>
  );
}
