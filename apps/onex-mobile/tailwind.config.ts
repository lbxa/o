import nativeConfig from "@o/tailwind/native";
// @ts-expect-error - no types
import nativewindPreset from "nativewind/preset";
import type { Config } from "tailwindcss";

export default {
  content: [...nativeConfig.content],
  presets: [nativeConfig, nativewindPreset],
} satisfies Config;
