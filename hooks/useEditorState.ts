import { useState } from "react";
import type {
  CaptionOverlay,
  CaptionPosition,
  CaptionStyle,
  EditorState,
} from "@/types/editor";

type Params = {
  uri: string;
  width: number;
  height: number;
};

export function useEditorState({ uri, width, height }: Params) {
  const [caption,  setCaption]  = useState("");
  const [position, setPosition] = useState<CaptionPosition>("bottom");
  const [style,    setStyle]    = useState<CaptionStyle>("bold");
  const [overlay,  setOverlay]  = useState<CaptionOverlay>("gradient");

  const snapshot: EditorState = {
    uri,
    width,
    height,
    caption,
    position,
    style,
    overlay,
  };

  return {
    snapshot,
    caption,  setCaption,
    position, setPosition,
    style,    setStyle,
    overlay,  setOverlay,
  };
}
