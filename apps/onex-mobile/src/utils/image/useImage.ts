import { useCallback } from "react";

import { useSecureStore } from "@/utils";

export interface MultiResolutionImageUploadResult {
  key: string;
  original: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
}

export interface ApiErrorResponse {
  message?: string;
  errors?: { message: string }[];
}

export type ImageUploadFunction = (
  uri: string
) => Promise<MultiResolutionImageUploadResult>;

export type ImageDeleteFunction = (endpoint: string) => Promise<boolean>;

/**
 * Base hook for handling image file uploads
 * @returns Common utilities for image uploads
 */
export const useImage = () => {
  const { getStoreItem } = useSecureStore();

  /**
   * Creates form data for image upload
   * @param uri - The image URI
   * @returns FormData object with the file
   */
  const createImageFormData = useCallback((uri: string): FormData => {
    // Check if URI exists
    if (!uri) {
      throw new Error("No image URI provided");
    }

    // Create form data for multipart/form-data request
    const formData = new FormData();

    // Get file name from URI
    const uriParts = uri.split("/");
    const fileName = uriParts[uriParts.length - 1];

    // Determine mime type (default to jpeg if can't be determined)
    let fileType = "image/jpeg";
    if (fileName.toLowerCase().endsWith(".png")) {
      fileType = "image/png";
    } else if (fileName.toLowerCase().endsWith(".gif")) {
      fileType = "image/gif";
    }

    // Create file object and append to form data
    // Note: The field name must be "file" to match the FileInterceptor in the controller
    const fileObject = {
      uri,
      name: fileName,
      type: fileType,
    };

    // React Native's FormData implementation accepts objects for files
    // This is a React Native specific pattern
    formData.append("file", fileObject as unknown as Blob);

    return formData;
  }, []);

  /**
   * Creates request options for image upload
   * @param formData - The form data containing the image
   * @returns Request options for fetch
   */
  const createRequestOptions = useCallback(
    (formData: FormData): RequestInit => {
      const token = getStoreItem("ACCESS_TOKEN");

      return {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          ...(__DEV__ ? { "x-apollo-operation-name": "uploadImage" } : {}),
        },
        body: formData,
      };
    },
    [getStoreItem]
  );

  /**
   * Uploads an image to a specified endpoint
   * @param uri - The image URI
   * @param endpoint - The API endpoint for upload
   * @returns Promise with the upload result
   */
  const uploadImage = useCallback(
    async (
      uri: string,
      endpoint: string
    ): Promise<MultiResolutionImageUploadResult> => {
      try {
        const formData = createImageFormData(uri);
        const options = createRequestOptions(formData);

        // API base URL should be defined in your environment or constants
        const API_URL = process.env.EXPO_PUBLIC_API_URL as string;
        if (!API_URL) {
          throw new Error("API_URL is not defined");
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);
        const responseData = (await response.json()) as unknown;

        // Handle error responses
        if (!response.ok) {
          const errorResponse = responseData as ApiErrorResponse;
          const errorMessage =
            errorResponse.message ??
            errorResponse.errors?.[0]?.message ??
            "Failed to upload image";
          throw new Error(errorMessage);
        }

        return responseData as MultiResolutionImageUploadResult;
      } catch (error) {
        console.error("Error uploading image:", error);
        // Re-throw the error for the caller to handle
        throw error instanceof Error
          ? error
          : new Error("Unknown error occurred during image upload");
      }
    },
    [createImageFormData, createRequestOptions]
  );

  /**
   * Adds a cache-busting parameter to a URL
   * @param url - The URL to add cache busting to
   * @returns URL with cache busting parameter
   */
  const addCacheBusting = useCallback((url: string): string => {
    const timestamp = Date.now();
    return url.includes("?")
      ? `${url}&_t=${timestamp}`
      : `${url}?_t=${timestamp}`;
  }, []);

  /**
   * Deletes an image using the specified endpoint
   * @param endpoint - The API endpoint for deletion
   * @returns Promise indicating success or failure
   */
  const deleteImage = useCallback(
    async (endpoint: string): Promise<boolean> => {
      try {
        // API base URL should be defined in your environment or constants
        const API_URL = process.env.EXPO_PUBLIC_API_URL as string;
        if (!API_URL) {
          throw new Error("API_URL is not defined");
        }

        const token = getStoreItem("ACCESS_TOKEN");

        const response = await fetch(`${API_URL}${endpoint}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(__DEV__ ? { "x-apollo-operation-name": "deleteImage" } : {}),
          },
        });

        // Check if there's content before trying to parse JSON
        const contentType = response.headers.get("content-type");
        let responseData: unknown = {};

        if (
          contentType &&
          contentType.includes("application/json") &&
          response.status !== 204
        ) {
          const text = await response.text();
          responseData = text ? JSON.parse(text) : {};
        }

        // Handle error responses
        if (!response.ok) {
          const errorResponse = responseData as ApiErrorResponse;
          const errorMessage =
            errorResponse.message ??
            errorResponse.errors?.[0]?.message ??
            "Failed to delete image";
          throw new Error(errorMessage);
        }

        return true;
      } catch (error) {
        console.error("Error deleting image:", error);
        // Re-throw the error for the caller to handle
        throw error instanceof Error
          ? error
          : new Error("Unknown error occurred during image deletion");
      }
    },
    [getStoreItem]
  );

  return {
    uploadImage,
    deleteImage,
    createImageFormData,
    createRequestOptions,
    addCacheBusting,
  };
};
