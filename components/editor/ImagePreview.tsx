import React from "react";
import { Image, Text, View } from "react-native";
import type { CaptionOverlay, CaptionPosition, CaptionStyle } from "@/types/editor";

type Props = {
  uri: string;
  caption: string;
  position: CaptionPosition;
  style: CaptionStyle;
  overlay: CaptionOverlay;
};

// Map position → flex alignment on the container
const positionStyle: Record<CaptionPosition, object> = {
  top:    { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  bottom: { justifyContent: "flex-end" },
};

// Map position → gradient direction (only used when overlay = gradient)
const gradientMap: Record<CaptionPosition, string> = {
  top:    "to bottom",
  center: "to bottom",
  bottom: "to top",
};

function CaptionText({ caption, style }: { caption: string; style: CaptionStyle }) {
  const isBold   = style === "bold";
  const isQuote  = style === "quote";
  const isMinimal = style === "minimal";

  return (
    <Text
      className="text-canvas"
      style={{
        fontSize:   isBold ? 17 : isMinimal ? 13 : 15,
        fontWeight: isBold ? "700" : "400",
        fontStyle:  isQuote ? "italic" : "normal",
        fontFamily: isQuote ? "serif" : undefined,
        lineHeight: isBold ? 24 : 20,
        letterSpacing: isMinimal ? 0.4 : 0,
      }}
    >
      {isQuote ? `"${caption}"` : caption}
    </Text>
  );
}

export default function ImagePreview({ uri, caption, position, style, overlay }: Props) {
  const showGradient = overlay === "gradient";
  const showBox      = overlay === "box";

  return (
    <View className="mx-4 rounded-2xl overflow-hidden bg-void-soft" style={{ height: 240 }}>
      {/* Photo */}
      <Image
        source={{ uri }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="cover"
      />

      {/* Overlay + Caption */}
      <View
        className="absolute inset-0 p-4"
        style={positionStyle[position]}
      >
        {/* Gradient overlay */}
        {showGradient && (
          <View
            style={{
              position: "absolute",
              left: 0, right: 0,
              ...(position === "top"    ? { top: 0, height: "55%" } : {}),
              ...(position === "center" ? { top: 0, bottom: 0 }    : {}),
              ...(position === "bottom" ? { bottom: 0, height: "55%" } : {}),
              background: `linear-gradient(${gradientMap[position]}, rgba(0,0,0,0.78), transparent)`,
              // RN-compatible fallback — use solid dark overlay for center
              backgroundColor: "transparent",
            }}
          >
            {/* React Native doesn't support CSS gradients — use View opacity layers */}
            <View
              style={{
                flex: 1,
                backgroundColor: position === "center"
                  ? "rgba(0,0,0,0.38)"
                  : "rgba(0,0,0,0.6)",
              }}
            />
          </View>
        )}

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
