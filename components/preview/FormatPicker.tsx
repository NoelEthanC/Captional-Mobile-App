import Colors from "@/constants/colors";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Pressable, Text, View } from "react-native";

export type ImageFormat = "png" | "jpg";

type Props = {
  value: ImageFormat;
  onChange: (format: ImageFormat) => void;
};

const FORMATS: { label: string; value: ImageFormat }[] = [
  { label: "PNG", value: "png" },
  { label: "JPG", value: "jpg" },
];

export default function FormatPicker({ value, onChange }: Props) {
  const { rs } = useResponsive();

  return (
    <View style={{ paddingHorizontal: rs(16), gap: rs(12) }}>
      <Text
        className="font-semibold uppercase tracking-widest text-ink-muted"
        style={{ fontSize: rs(11), letterSpacing: 1.8 }}
      >
        Save As
      </Text>

      <View className="flex-row" style={{ gap: rs(10) }}>
        {FORMATS.map((fmt) => {
          const isActive = fmt.value === value;
          return (
            <Pressable
              key={fmt.value}
              onPress={() => onChange(fmt.value)}
              className={`rounded-full active:opacity-70 ${isActive ? "bg-ink" : "bg-transparent"}`}
              style={{
                paddingHorizontal: rs(22),
                paddingVertical: rs(10),
                borderWidth: 1.5,
                borderColor: isActive ? Colors.ink : Colors.border,
              }}
            >
              <Text
                className={`font-semibold ${isActive ? "text-canvas" : "text-ink-muted"}`}
                style={{ fontSize: rs(14) }}
              >
                {fmt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
