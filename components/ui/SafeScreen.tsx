import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  dark?: boolean;
};

export default function SafeScreen({ children, dark = false }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={dark ? "flex-1 bg-void" : "flex-1 bg-canvas"}
      style={{ paddingTop: insets.top }}
    >
      {children}
    </View>
  );
}
