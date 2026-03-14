import React, { type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type Props = { children: ReactNode };
type State = { crashed: boolean; error: Error | null };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { crashed: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { crashed: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production you'd send this to Sentry / Crashlytics
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ crashed: false, error: null });
  };

  render() {
    if (!this.state.crashed) return this.props.children;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0A0A0A",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
          gap: 24,
        }}
      >
        {/* Icon — simple broken image shape */}
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            backgroundColor: "#1A1A1A",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#2E2E2E",
          }}
        >
          <Text style={{ fontSize: 32 }}>⚠️</Text>
        </View>

        {/* Heading */}
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text
            style={{
              color: "#FAFAFA",
              fontSize: 22,
              fontWeight: "700",
              fontFamily: "serif",
              textAlign: "center",
            }}
          >
            Something went wrong
          </Text>
          <Text
            style={{
              color: "#6B6B6B",
              fontSize: 14,
              textAlign: "center",
              lineHeight: 21,
            }}
          >
            Captional ran into an unexpected error.{"\n"}
            Tap below to try again.
          </Text>
        </View>

        {/* Retry button */}
        <Pressable
          onPress={this.handleReset}
          style={{
            backgroundColor: "#FAFAFA",
            borderRadius: 100,
            paddingHorizontal: 32,
            paddingVertical: 14,
          }}
        >
          <Text style={{ color: "#0A0A0A", fontSize: 15, fontWeight: "700" }}>
            Try Again
          </Text>
        </Pressable>

        {/* Error detail — only in dev */}
        {__DEV__ && this.state.error && (
          <Text
            style={{
              color: "#2E2E2E",
              fontSize: 11,
              textAlign: "center",
              fontFamily: "monospace",
            }}
            numberOfLines={4}
          >
            {this.state.error.message}
          </Text>
        )}
      </View>
    );
  }
}
