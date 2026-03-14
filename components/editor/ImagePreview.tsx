import type {
  CaptionOverlay,
  CaptionPosition,
  CaptionStyle,
} from "@/types/editor";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  uri: string;
  caption: string;
  position: CaptionPosition;
  style: CaptionStyle;
  overlay: CaptionOverlay;
};

// Flex alignment for the caption layer
const positionStyle: Record<CaptionPosition, object> = {
  top: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  bottom: { justifyContent: "flex-end" },
};

// LinearGradient colors per position:
// top    → dark at top fading down to transparent
// center → transparent → dark centre → transparent
// bottom → transparent at top fading down to dark
const gradientColors: Record<
  CaptionPosition,
  readonly [string, string, ...string[]]
> = {
  top: ["rgba(0,0,0,0.78)", "rgba(0,0,0,0.0)"],
  center: ["rgba(0,0,0,0.0)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.0)"],
  bottom: ["rgba(0,0,0,0.0)", "rgba(0,0,0,0.78)"],
};

function CaptionText({
  caption,
  style,
}: {
  caption: string;
  style: CaptionStyle;
}) {
  const isBold = style === "bold";
  const isQuote = style === "quote";
  const isMinimal = style === "minimal";

  return (
    <Text
      style={{
        color: "#FAFAFA",
        fontSize: isBold ? 17 : isMinimal ? 13 : 15,
        fontWeight: isBold ? "700" : "400",
        fontStyle: isQuote ? "italic" : "normal",
        fontFamily: isQuote ? "serif" : undefined,
        lineHeight: isBold ? 24 : 20,
        letterSpacing: isMinimal ? 0.4 : 0,
      }}
    >
      {isQuote ? `"${caption}"` : caption}
    </Text>
  );
}

export default function ImagePreview({
  uri,
  caption,
  position,
  style,
  overlay,
}: Props) {
  const showGradient = overlay === "gradient";
  const showBox = overlay === "box";

  return (
    <View
      className="mx-4 rounded-2xl overflow-hidden bg-void-soft"
      style={{ height: 240 }}
    >
      {/* Photo */}
      <Image
        source={{ uri }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="cover"
      />

      {/* Gradient overlay — covers full frame, fades per position */}
      {showGradient && (
        <LinearGradient
          colors={gradientColors[position]}
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        />
      )}

      {/* Caption layer — positioned on top of gradient */}
      <View className="absolute inset-0 p-4" style={positionStyle[position]}>
        {/* Box overlay */}
        {showBox && caption.length > 0 && (
          <View
            className="self-start rounded-xl px-3 py-2"
            style={{ backgroundColor: "rgba(0,0,0,0.58)" }}
          >
            <CaptionText caption={caption} style={style} />
          </View>
        )}

        {/* Bare / gradient caption */}
        {!showBox && caption.length > 0 && (
          <View className="px-1">
            <CaptionText caption={caption} style={style} />
          </View>
        )}
      </View>
    </View>
  );
}
