import CaptionInput from "@/components/editor/CaptionInput";
import EditorControls from "@/components/editor/EditorControls";
import EditorNavBar from "@/components/editor/EditorNavBar";
import ImagePreview from "@/components/editor/ImagePreview";
import SafeScreen from "@/components/ui/SafeScreen";
import { useEditorState } from "@/hooks/useEditorState";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function EditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    uri: string;
    width: string;
    height: string;
  }>();

  const {
    snapshot,
    caption,
    setCaption,
    position,
    setPosition,
    style,
    setStyle,
    overlay,
    setOverlay,
  } = useEditorState({
    uri: params.uri ?? "",
    width: Number(params.width ?? 0),
    height: Number(params.height ?? 0),
  });

  const handleNext = () => {
    router.push({
      pathname: "/preview",
      params: {
        uri: snapshot.uri,
        width: snapshot.width,
        height: snapshot.height,
        caption: snapshot.caption,
        position: snapshot.position,
        style: snapshot.style,
        overlay: snapshot.overlay,
      },
    });
  };

  return (
    <SafeScreen dark>
      {/* KeyboardAvoidingView pushes content up when keyboard opens */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        {/* NavBar sits outside scroll — always visible */}
        <EditorNavBar onBack={() => router.back()} onNext={handleNext} />

        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-4 pb-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Live preview */}
          <ImagePreview
            uri={snapshot.uri}
            caption={caption}
            position={position}
            style={style}
            overlay={overlay}
          />

          {/* Caption text input */}
          <CaptionInput value={caption} onChange={setCaption} />

          {/* Position / Style / Overlay toggles */}
          <View className="gap-4 pt-2">
            <EditorControls
              position={position}
              style={style}
              overlay={overlay}
              onPositionChange={setPosition}
              onStyleChange={setStyle}
              onOverlayChange={setOverlay}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}
