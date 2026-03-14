import { useWindowDimensions } from "react-native";

/**
 * Returns helpers to scale sizes relative to the current screen.
 *
 * - wp(pct)  → % of screen width   e.g. wp(0.06) = 6% of width
 * - hp(pct)  → % of screen height  e.g. hp(0.04) = 4% of height
 * - rs(size) → scales a base size that was designed for a 390pt wide screen
 *              (iPhone 14 logical width). Anything narrower shrinks it,
 *              wider grows it — capped so it never gets absurd.
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const BASE_WIDTH = 390;
  const scale = width / BASE_WIDTH;
  const clampedScale = Math.min(Math.max(scale, 0.8), 1.3);

  function wp(fraction: number) {
    return width * fraction;
  }

  function hp(fraction: number) {
    return height * fraction;
  }

  function rs(size: number) {
    return Math.round(size * clampedScale);
  }

  return { width, height, wp, hp, rs };
}
