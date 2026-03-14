import React from "react";
import { Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <View className="px-6 pt-7 pb-2">
      <Text className="text-xs font-semibold tracking-widest text-ink-muted uppercase mb-2">
        Captional
      </Text>
      <Text className="text-4xl font-bold text-ink leading-tight"
        style={{ fontFamily: "serif" }}
      >
        Your photo,{"\n"}your words.
      </Text>
    </View>
  );
}
