import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export default function ChoosePhotoButton({ onPress, loading = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="mx-6 h-14 rounded-full bg-ink items-center justify-center active:opacity-80"
    >
      {loading ? (
        <ActivityIndicator color="#FAFAFA" />
      ) : (
        <Text className="text-base font-semibold text-canvas tracking-wide">
          Choose Photo
        </Text>
      )}
    </Pressable>
  );
}
