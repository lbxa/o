export interface MultiSizedImage {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
}

export type CommonImageResolution =
  | "thumbnail"
  | "small"
  | "medium"
  | "large"
  | "original";

export const COMMON_IMAGE_RESOLUTIONS: Record<
  Exclude<CommonImageResolution, "original">,
  [number, number]
> = {
  thumbnail: [150, 150],
  small: [320, 320],
  medium: [1024, 1024],
  large: [1920, 1920],
} as const;

export const isCommonImageResolution = (
  size: string
): size is CommonImageResolution => {
  return Object.keys(COMMON_IMAGE_RESOLUTIONS).includes(size);
};
