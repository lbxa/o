import { useCallback } from "react";
import { useRelayEnvironment } from "react-relay";
import { commitLocalUpdate, graphql } from "relay-runtime";

import type { useAvatarImageQuery } from "@/__generated__/useAvatarImageQuery.graphql";

import type { MultiResolutionImageUploadResult } from "./useImage";
import { useImage } from "./useImage";

/**
 * Interface for avatar image operations
 */
export interface AvatarImageOperations {
  /**
   * Uploads an avatar image
   * @param uri - The image URI
   * @returns Promise with the upload result
   */
  uploadAvatarImage: (uri: string) => Promise<MultiResolutionImageUploadResult>;

  /**
   * Deletes the current avatar image
   * @returns Promise indicating success or failure
   */
  deleteAvatarImage: () => Promise<boolean>;
}

// GraphQL fragment for avatar image operations
const AVATAR_IMAGE_FRAGMENT = graphql`
  query useAvatarImageQuery @updatable {
    viewer {
      user {
        avatarUrl
      }
    }
  }
`;

/**
 * Hook for handling avatar image operations
 * @returns Functions to upload and delete avatar images
 */
export const useAvatarImage = (): AvatarImageOperations => {
  const { uploadImage, deleteImage, addCacheBusting } = useImage();
  const environment = useRelayEnvironment();

  /**
   * Uploads an avatar image and updates the Relay store
   * @param uri - The image URI
   * @returns Promise with the upload result
   */
  const uploadAvatarImage = useCallback(
    async (uri: string): Promise<MultiResolutionImageUploadResult> => {
      const responseData = await uploadImage(uri, "/api/image/avatar/upload");
      commitLocalUpdate(environment, (store) => {
        const { updatableData } = store.readUpdatableQuery<useAvatarImageQuery>(
          AVATAR_IMAGE_FRAGMENT,
          {}
        );

        if (updatableData.viewer?.user) {
          const baseUrl = responseData.medium;
          const urlWithCacheBuster = addCacheBusting(baseUrl);

          updatableData.viewer.user.avatarUrl = urlWithCacheBuster;
        }
      });

      return responseData;
    },
    [uploadImage, environment, addCacheBusting]
  );

  /**
   * Deletes the current avatar image and updates the Relay store
   * @returns Promise indicating success or failure
   */
  const deleteAvatarImage = useCallback(async (): Promise<boolean> => {
    // Use the shared deleteImage function
    await deleteImage("/api/image/avatar");

    // Update the Relay store to remove the avatar URL
    commitLocalUpdate(environment, (store) => {
      const { updatableData } = store.readUpdatableQuery<useAvatarImageQuery>(
        AVATAR_IMAGE_FRAGMENT,
        {}
      );

      if (updatableData.viewer?.user) {
        // Set to null or a default avatar URL
        updatableData.viewer.user.avatarUrl = null;
      }
    });

    return true;
  }, [environment, deleteImage]);

  return {
    uploadAvatarImage,
    deleteAvatarImage,
  };
};
