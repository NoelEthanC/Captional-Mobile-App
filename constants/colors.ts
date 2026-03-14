const Colors = {
  // Surfaces
  canvas: "#FAFAFA",
  surface: "#FFFFFF",
  overlay: "#F2F2F2",

  // Ink scale
  ink: "#0A0A0A",
  inkMuted: "#6B6B6B",
  inkFaint: "#C4C4C4",

  // Dark / void (editor mode)
  void: "#0A0A0A",
  voidSoft: "#1A1A1A",
  voidBorder: "#2E2E2E",

  // Aliases for convenience in JS (mirrors Tailwind tokens)
  inkMuted: "#6B6B6B",

  // Borders
  border: "#E8E8E8",
  borderDashed: "#C4C4C4",
} as const;

export default Colors;
