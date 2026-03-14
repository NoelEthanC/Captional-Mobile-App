import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export default function ShareButton({ onPress, loading = false }: Props) {
  const { rs } = useResponsive();

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="bg-overlay items-center justify-center active:opacity-70"
      style={{
        marginHorizontal: rs(16),
        height: rs(50),
        borderRadius: rs(100),
      }}
    >
      <Text className="text-ink font-semibold" style={{ fontSize: rs(15) }}>
        Share
      </Text>
    </Pressable>
  );
}
