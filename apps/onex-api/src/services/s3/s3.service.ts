import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";

export interface S3UploadResponse {
  key: string;
  url: string;
}

interface ErrorWithMessage {
  message: string;
  stack?: string;
}

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly logger = new Logger(S3Service.name);
  private readonly bucketName: string;
  private readonly region: string;
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    bucketName: string
  ) {
    this.region = this.configService.getOrThrow<string>("AWS_REGION");

    this.bucketName = bucketName;
    this.baseUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com`;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.getOrThrow<string>(
          "AWS_SECRET_ACCESS_KEY"
        ),
      },
    });
  }

  get getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Upload a file to S3
   * @param file - The file buffer to upload
   * @param mimeType - The MIME type of the file
   * @param folder - Optional folder path within the bucket
   * @returns Promise with the uploaded file key and URL
   */
  async uploadFile({
    fileBuffer,
    filename,
    mimeType,
    folder,
  }: {
    fileBuffer: Buffer;
    filename: string;
    mimeType: string;
    folder: string;
  }): Promise<S3UploadResponse> {
    try {
      const fileExtension = this.getFileExtension(mimeType);
      if (!fileExtension) {
        throw new Error("Invalid MIME type");
      }

      const key = `${folder}/${filename}${fileExtension}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
      });

      await this.s3Client.send(command);
      const url = `${this.baseUrl}/${key}`;

      return { key, url };
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(
        `Failed to upload file to S3: ${err.message}`,
        err.stack
      );
      throw new Error(`Failed to upload file: ${err.message}`);
    }
  }

  /**
   * Delete a file from S3
   * @param key - The key of the file to delete
   * @returns Promise indicating success
   */
  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(
        `Failed to delete file from S3: ${err.message}`,
        err.stack
      );
      throw new Error(`Failed to delete file: ${err.message}`);
    }
  }

  /**
   * Delete a folder and all its contents from S3
   * !Note: S3 has a limit of 1000 objects per listing operation and 1000 objects
   * !per bulk delete operation. For folders with more objects, multiple API calls
   * !would be needed or make this function recursive.
   * @param key - The key of the folder to delete
   * @returns Promise indicating success
   */
  async deleteFolder(key: string): Promise<boolean> {
    try {
      const fileList = await this.s3Client.send(
        new ListObjectsV2Command({
          Bucket: this.bucketName,
          Prefix: key,
        })
      );

      if (fileList.KeyCount) {
        const deleted = await this.s3Client.send(
          new DeleteObjectsCommand({
            Bucket: this.bucketName,
            Delete: {
              Objects: fileList.Contents?.map((file) => ({
                Key: file.Key,
              })),
              Quiet: true, // silence info on successful deletes
            },
          })
        );

        if (deleted.Deleted?.length) {
          return true;
        }
      }

      return false;
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(
        `Failed to delete folder from S3: ${err.message}`,
        err.stack
      );
      throw new Error(`Failed to delete folder: ${err.message}`);
    }
  }

  /**
   * Generate a pre-signed URL for direct upload to S3
   * @param mimeType - The MIME type of the file
   * @param folder - Optional folder path within the bucket
   * @param expiresIn - URL expiration time in seconds (default: 3600)
   * @returns Promise with the pre-signed URL
   */
  async getPresignedUploadUrl(
    mimeType: string,
    folder = "images",
    expiresIn = 3600
  ): Promise<{ key: string; presignedUrl: string }> {
    try {
      const fileExtension = this.getFileExtension(mimeType);
      if (!fileExtension) {
        throw new Error("Invalid MIME type");
      }

      const key = `${folder}/${uuidv4()}${fileExtension}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: mimeType,
      });

      const presignedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn,
      });

      return { key, presignedUrl };
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(
        `Failed to generate pre-signed URL: ${err.message}`,
        err.stack
      );
      throw new Error(`Failed to generate pre-signed URL: ${err.message}`);
    }
  }

  /**
   * Generate a pre-signed URL for downloading a file from S3
   * @param key - The key of the file
   * @param expiresIn - URL expiration time in seconds (default: 3600)
   * @returns Promise with the pre-signed URL
   */
  async getPresignedDownloadUrl(
    key: string,
    expiresIn = 3600
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(
        `Failed to generate pre-signed download URL: ${err.message}`,
        err.stack
      );
      throw new Error(
        `Failed to generate pre-signed download URL: ${err.message}`
      );
    }
  }

  /**
   * Get the public URL for a file
   * @param key - The key of the file
   * @returns The public URL
   */
  getPublicUrl(key: string): string {
    return `${this.baseUrl}/${key}`;
  }

  /**
   * Helper method to get file extension from MIME type
   * @param mimeType - The MIME type
   * @returns The file extension with dot
   */
  private getFileExtension(mimeType: string): string | undefined {
    const mimeToExt: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/jpg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "image/webp": ".webp",
      "image/svg+xml": ".svg",
    };

    return mimeToExt[mimeType] ?? undefined;
  }

  /**
   * Helper method to validate image MIME type
   * @param mimeType - The MIME type to validate
   * @returns Boolean indicating if the MIME type is valid
   */
  isValidImageType(mimeType: string): boolean {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];

    return validTypes.includes(mimeType);
  }
}
