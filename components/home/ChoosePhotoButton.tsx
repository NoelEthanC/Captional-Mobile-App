import Colors from "@/constants/colors";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export default function ChoosePhotoButton({ onPress, loading = false }: Props) {
  const { rs } = useResponsive();

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="bg-ink items-center justify-center active:opacity-80"
      style={{
        marginHorizontal: rs(24),
        height: rs(56),
        borderRadius: rs(100),
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.canvas} />
      ) : (
        <Text
          className="text-canvas font-semibold"
          style={{ fontSize: rs(16), letterSpacing: 0.3 }}
        >
          Choose Photo
        </Text>
      )}
    </Pressable>
  );
}
