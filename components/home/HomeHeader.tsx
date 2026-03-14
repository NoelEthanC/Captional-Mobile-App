import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Text, View } from "react-native";

export default function HomeHeader() {
  const { hp, rs } = useResponsive();

  return (
    <View
      style={{
        paddingHorizontal: rs(24),
        paddingTop: hp(0.04),
        paddingBottom: hp(0.01),
      }}
    >
      <Text
        className="font-semibold uppercase tracking-widest text-ink-muted"
        style={{ fontSize: rs(11), letterSpacing: 2, marginBottom: rs(10) }}
      >
        Captional
      </Text>
      <Text
        className="font-extrabold text-ink"
        style={{ fontSize: rs(36), lineHeight: rs(44), fontFamily: "serif" }}
      >
        Your photo,{"\n"}your words.
      </Text>
    </View>
  );
}
