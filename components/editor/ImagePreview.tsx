import { useResponsive } from "@/hooks/useResponsive";
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
  rs,
}: {
  caption: string;
  style: CaptionStyle;
  rs: (n: number) => number;
}) {
  const isBold = style === "bold";
  const isQuote = style === "quote";
  const isMinimal = style === "minimal";

  return (
    <Text
      style={{
        color: "#FAFAFA",
        fontSize: isBold ? rs(17) : isMinimal ? rs(13) : rs(15),
        fontWeight: isBold ? "700" : "400",
        fontStyle: isQuote ? "italic" : "normal",
        fontFamily: isQuote ? "serif" : undefined,
        lineHeight: isBold ? rs(24) : rs(20),
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
  const { rs } = useResponsive();
  const showGradient = overlay === "gradient";
  const showBox = overlay === "box";

  return (
    // flex:1 — fills all remaining vertical space between navbar and controls panel
    <View
      className="bg-void-soft"
      style={{
        flex: 1,
        marginHorizontal: rs(16),
        borderRadius: rs(20),
        overflow: "hidden",
      }}
    >
      {/* Photo — cover the whole frame */}
      <Image
        source={{ uri }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="cover"
      />

      {/* Gradient overlay */}
      {showGradient && (
        <LinearGradient
          colors={gradientColors[position]}
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        />
      )}

      {/* Caption layer */}
      <View
        className="absolute inset-0"
        style={{ ...positionStyle[position], padding: rs(16) }}
      >
        {showBox && caption.length > 0 && (
          <View
            className="self-start rounded-xl"
            style={{
              paddingHorizontal: rs(12),
              paddingVertical: rs(8),
              backgroundColor: "rgba(0,0,0,0.58)",
            }}
          >
            <CaptionText caption={caption} style={style} rs={rs} />
          </View>
        )}

        {!showBox && caption.length > 0 && (
          <View style={{ paddingHorizontal: rs(4) }}>
            <CaptionText caption={caption} style={style} rs={rs} />
          </View>
        )}
      </View>
    </View>
  );
}
