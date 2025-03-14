import type { MultiSizedImage } from "@o/utils";

export interface ImageUploader {
  uploadFile(params: {
    fileBuffer: Buffer;
    filename: string;
    folder: string;
    mimeType: string;
  }): Promise<{ key: string; url: string }>;
}

export interface MultiSizedImageResult extends MultiSizedImage {
  key: string;
  original: string;
}
