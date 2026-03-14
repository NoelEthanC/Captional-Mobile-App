import type {
  CaptionOverlay,
  CaptionPosition,
  CaptionStyle,
} from "@/types/editor";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef } from "react";
import { Image, Text, View } from "react-native";

type Props = {
  uri: string;
  caption: string;
  position: CaptionPosition;
  style: CaptionStyle;
  overlay: CaptionOverlay;
};

const positionStyle: Record<CaptionPosition, object> = {
  top: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  bottom: { justifyContent: "flex-end" },
};

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
        fontSize: isBold ? 18 : isMinimal ? 13 : 15,
        fontWeight: isBold ? "700" : "400",
        fontStyle: isQuote ? "italic" : "normal",
        fontFamily: isQuote ? "serif" : undefined,
        lineHeight: isBold ? 26 : 21,
        letterSpacing: isMinimal ? 0.5 : 0,
      }}
    >
      {isQuote ? `"${caption}"` : caption}
    </Text>
  );
}

// forwardRef so parent can pass a ref for view-shot capture
const PreviewImage = forwardRef<View, Props>(
  ({ uri, caption, position, style, overlay }, ref) => {
    const showGradient = overlay === "gradient";
    const showBox = overlay === "box";

    return (
      <View
        ref={ref}
        className="mx-4 rounded-3xl overflow-hidden bg-overlay"
        style={{ aspectRatio: 1 }}
        collapsable={false} // required for react-native-view-shot
      >
        {/* Photo */}
        <Image
          source={{ uri }}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          resizeMode="cover"
        />

        {/* CAPTIONAL watermark */}
        <View
          className="absolute top-3 right-3 rounded-lg px-2 py-1"
          style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
        >
          <Text
            style={{
              color: "#FAFAFA",
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 1.2,
            }}
          >
            CAPTIONAL
          </Text>
        </View>

        {/* Caption layer */}
        <View className="absolute inset-0 p-4" style={positionStyle[position]}>
          {/* Gradient overlay */}
          {showGradient && (
            <LinearGradient
              colors={gradientColors[position]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
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
  },
);

PreviewImage.displayName = "PreviewImage";
export default PreviewImage;
