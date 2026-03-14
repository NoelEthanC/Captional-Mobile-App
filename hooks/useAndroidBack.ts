import { useEffect } from "react";
import { Alert, BackHandler, Platform } from "react-native";

type Options = {
  /** Called when user confirms they want to go back. */
  onBack: () => void;
  /**
   * If true, shows a confirmation Alert before going back.
   * Use on screens with unsaved work (editor).
   * Default: false.
   */
  confirm?: boolean;
  confirmTitle?: string;
  confirmMessage?: string;
};

/**
 * Handles the Android hardware back button.
 * - On iOS this is a no-op (no hardware back button).
 * - When confirm=true, shows an Alert before calling onBack.
 * - When confirm=false, calls onBack immediately.
 */
export function useAndroidBack({
  onBack,
  confirm = false,
  confirmTitle   = "Discard changes?",
  confirmMessage = "Your caption and settings will not be saved.",
}: Options) {
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const handler = () => {
      if (confirm) {
        Alert.alert(confirmTitle, confirmMessage, [
          { text: "Keep editing", style: "cancel" },
          {
            text:    "Discard",
            style:   "destructive",
            onPress: onBack,
          },
        ]);
      } else {
        onBack();
      }
      // Return true to tell React Native we handled the event —
      // prevents the default behaviour (minimising the app).
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handler
    );

    return () => subscription.remove();
  }, [onBack, confirm, confirmTitle, confirmMessage]);
}
