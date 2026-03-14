import Colors from "@/constants/colors";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function OptionToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  const { rs } = useResponsive();

  return (
    <View style={{ gap: rs(8) }}>
      <Text
        className="font-semibold uppercase tracking-widest text-ink-muted"
        style={{
          fontSize: rs(11),
          letterSpacing: 1.8,
          paddingHorizontal: rs(16),
        }}
      >
        {label}
      </Text>

      <View
        className="flex-row"
        style={{ paddingHorizontal: rs(16), gap: rs(8) }}
      >
        {options.map((opt) => {
          const isActive = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              className={`flex-1 items-center justify-center active:opacity-70 ${
                isActive ? "bg-canvas" : "bg-transparent"
              }`}
              style={{
                paddingVertical: rs(11),
                borderRadius: rs(12),
                borderWidth: 1,
                borderColor: isActive ? Colors.canvas : Colors.voidBorder,
              }}
            >
              <Text
                className={isActive ? "text-ink font-bold" : "text-ink-muted"}
                style={{ fontSize: rs(14) }}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
