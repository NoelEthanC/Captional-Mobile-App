import React from "react";
import { Pressable, Text } from "react-native";
import Colors from "@/constants/colors";

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export default function ShareButton({ onPress, loading = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="mx-4 h-12 rounded-full items-center justify-center active:opacity-70"
      style={{
        backgroundColor: Colors.overlay,
      }}
    >
      <Text
        className="text-sm font-semibold"
        style={{ color: Colors.ink }}
      >
        Share
      </Text>
    </Pressable>
  );
}
