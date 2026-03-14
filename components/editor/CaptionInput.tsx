import Colors from "@/constants/colors";
import { useResponsive } from "@/hooks/useResponsive";
import React, { useRef } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInput as TextInputType,
} from "react-native";

const MAX_CHARS = 200;

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function CaptionInput({ value, onChange }: Props) {
  const inputRef = useRef<TextInputType>(null);
  const { rs } = useResponsive();
  const isNearLimit = MAX_CHARS - value.length <= 20;

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      className="bg-void-soft border border-void-border"
      style={{
        marginHorizontal: rs(16),
        borderRadius: rs(16),
        paddingHorizontal: rs(16),
        paddingTop: rs(14),
        paddingBottom: rs(10),
      }}
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
          fontSize: rs(15),
          lineHeight: rs(22),
          minHeight: rs(52),
          textAlignVertical: "top",
        }}
        blurOnSubmit={false}
      />

      <View className="flex-row justify-end" style={{ marginTop: rs(4) }}>
        <Text
          style={{
            fontSize: rs(11),
            fontFamily: "monospace",
            color: isNearLimit ? "#EF9F27" : Colors.inkMuted,
          }}
        >
          {value.length}/{MAX_CHARS}
        </Text>
      </View>
    </Pressable>
  );
}
