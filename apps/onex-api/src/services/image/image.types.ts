export type ImageType = "thumbnail" | "small" | "medium" | "large" | "original";

export const COMMON_IMAGE_RESOLUTIONS: Record<
  Exclude<ImageType, "original">,
  [number, number]
> = {
  thumbnail: [150, 150],
  small: [320, 320],
  medium: [1024, 1024],
  large: [1920, 1920],
} as const;

export interface ImageUploader {
  uploadFile(params: {
    fileBuffer: Buffer;
    filename: string;
    folder: string;
    mimeType: string;
  }): Promise<{ key: string; url: string }>;
}

export interface MultiSizedImageResult {
  key: string;
  original: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
}
