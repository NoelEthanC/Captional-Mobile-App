import React from "react";
import { Pressable, Text, View } from "react-native";
import Colors from "@/constants/colors";

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
  return (
    <View className="px-4 gap-3">
      <Text
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: Colors.inkMuted }}
      >
        Save As
      </Text>

      <View className="flex-row gap-2">
        {FORMATS.map((fmt) => {
          const isActive = fmt.value === value;
          return (
            <Pressable
              key={fmt.value}
              onPress={() => onChange(fmt.value)}
              className="rounded-full px-5 py-2 active:opacity-70"
              style={{
                borderWidth:     1.5,
                borderColor:     isActive ? Colors.ink : Colors.border,
                backgroundColor: isActive ? Colors.ink : "transparent",
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: isActive ? Colors.canvas : Colors.inkMuted }}
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
