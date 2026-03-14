export type CaptionPosition = "top" | "center" | "bottom";
export type CaptionStyle = "bold" | "minimal" | "quote";
export type CaptionOverlay = "none" | "gradient" | "box";

export type EditorState = {
  uri: string;
  width: number;
  height: number;
  caption: string;
  position: CaptionPosition;
  style: CaptionStyle;
  overlay: CaptionOverlay;
};
