import React from "react";
import { View } from "react-native";
import OptionToggle from "./OptionToggle";
import type {
  CaptionOverlay,
  CaptionPosition,
  CaptionStyle,
} from "@/types/editor";

type Props = {
  position: CaptionPosition;
  style: CaptionStyle;
  overlay: CaptionOverlay;
  onPositionChange: (v: CaptionPosition) => void;
  onStyleChange: (v: CaptionStyle) => void;
  onOverlayChange: (v: CaptionOverlay) => void;
};

const POSITION_OPTIONS: { label: string; value: CaptionPosition }[] = [
  { label: "Top",    value: "top"    },
  { label: "Center", value: "center" },
  { label: "Bottom", value: "bottom" },
];

const STYLE_OPTIONS: { label: string; value: CaptionStyle }[] = [
  { label: "Bold",    value: "bold"    },
  { label: "Minimal", value: "minimal" },
  { label: "Quote",   value: "quote"   },
];

const OVERLAY_OPTIONS: { label: string; value: CaptionOverlay }[] = [
  { label: "None",     value: "none"     },
  { label: "Gradient", value: "gradient" },
  { label: "Box",      value: "box"      },
];

export default function EditorControls({
  position,
  style,
  overlay,
  onPositionChange,
  onStyleChange,
  onOverlayChange,
}: Props) {
  return (
    <View className="gap-4">
      <OptionToggle
        label="Position"
        options={POSITION_OPTIONS}
        value={position}
        onChange={onPositionChange}
      />
      <OptionToggle
        label="Style"
        options={STYLE_OPTIONS}
        value={style}
        onChange={onStyleChange}
      />
      <OptionToggle
        label="Overlay"
        options={OVERLAY_OPTIONS}
        value={overlay}
        onChange={onOverlayChange}
      />
    </View>
  );
}
