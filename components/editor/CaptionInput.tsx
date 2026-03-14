import React, { useRef } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInput as TextInputType,
} from "react-native";
import Colors from "@/constants/colors";

const MAX_CHARS = 200;

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function CaptionInput({ value, onChange }: Props) {
  const inputRef = useRef<TextInputType>(null);
  const remaining = MAX_CHARS - value.length;
  const isNearLimit = remaining <= 20;

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      className="mx-4 rounded-2xl px-4 pt-3 pb-2"
      style={{ backgroundColor: Colors.voidSoft, borderColor: Colors.voidBorder, borderWidth: 1 }}
    >
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => t.length <= MAX_CHARS && onChange(t)}
        placeholder="Add a caption…"
        placeholderTextColor={Colors.inkMuted}
        multiline
        maxLength={MAX_CHARS}
        style={{
          color: Colors.canvas,
          fontSize: 15,
          lineHeight: 22,
          minHeight: 52,
          textAlignVertical: "top",
        }}
        // Keep keyboard from covering content on Android
        blurOnSubmit={false}
      />

      {/* Counter row */}
      <View className="flex-row justify-end mt-1">
        <Text
          className="text-xs font-mono"
          style={{ color: isNearLimit ? "#EF9F27" : Colors.inkMuted }}
        >
          {value.length}/{MAX_CHARS}
        </Text>
      </View>
    </Pressable>
  );
}
