import CaptionInput from "@/components/editor/CaptionInput";
import EditorControls from "@/components/editor/EditorControls";
import EditorNavBar from "@/components/editor/EditorNavBar";
import ImagePreview from "@/components/editor/ImagePreview";
import EmptyState from "@/components/ui/EmptyState";
import SafeScreen from "@/components/ui/SafeScreen";
import { useAndroidBack } from "@/hooks/useAndroidBack";
import { useEditorState } from "@/hooks/useEditorState";
import { useResponsive } from "@/hooks/useResponsive";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
export default function EditorScreen() {
  const router = useRouter();
  const { rs, hp } = useResponsive();
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

  const handleBack = () => router.back();

  // Android hardware back — confirm before discarding caption work
  useAndroidBack({
    onBack: handleBack,
    confirm: caption.length > 0, // only confirm if user has typed something
    confirmTitle: "Discard caption?",
    confirmMessage: "Going back will lose your caption and settings.",
  });

  // ── Guard: no photo uri means something went wrong upstream ──
  if (!params.uri) {
    return (
      <SafeScreen dark>
        <EmptyState onGoBack={handleBack} />
      </SafeScreen>
    );
  }

  return (
    <SafeScreen dark>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        {/* ── Top: NavBar (fixed) ── */}
        {/* <EditorNavBar onBack={() => router.back()} onNext={handleNext} /> */}
        <EditorNavBar onBack={handleBack} onNext={handleNext} />
        {/* ── Middle: Image preview — grows to fill remaining space ── */}
        <ImagePreview
          uri={snapshot.uri}
          caption={caption}
          position={position}
          style={style}
          overlay={overlay}
        />

        {/* ── Bottom: Controls panel — always pinned, scrolls internally ── */}
        <View style={{ paddingTop: rs(10) }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: rs(16), paddingBottom: hp(0.03) }}
            // Cap the panel height so the image always stays visible
            // style={{ maxHeight: hp(0.42) }}
          >
            <CaptionInput value={caption} onChange={setCaption} />
            <EditorControls
              position={position}
              style={style}
              overlay={overlay}
              onPositionChange={setPosition}
              onStyleChange={setStyle}
              onOverlayChange={setOverlay}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}
