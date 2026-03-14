import Colors from "@/constants/colors";
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
  return (
    <View className="gap-2">
      {/* Section label */}
      <Text
        className="text-xs font-semibold tracking-widest uppercase px-4"
        style={{ color: Colors.inkMuted }}
      >
        {label}
      </Text>

      {/* Toggle pills */}
      <View className="flex-row px-4 gap-2">
        {options.map((opt) => {
          const isActive = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              className="flex-1 items-center justify-center py-2 rounded-xl active:opacity-70"
              style={{
                borderWidth: 1,
                borderColor: isActive ? Colors.canvas : Colors.voidBorder,
                backgroundColor: isActive ? Colors.canvas : "transparent",
              }}
            >
              <Text
                className="text-sm"
                style={{
                  color: isActive ? Colors.ink : Colors.inkMuted,
                  fontWeight: isActive ? "700" : "400",
                }}
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
