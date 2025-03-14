import { useCallback } from "react";
import { useRelayEnvironment } from "react-relay";
import { commitLocalUpdate, graphql } from "relay-runtime";

// import type { useCommunityImageRefreshQuery } from "@/__generated__/useCommunityImageRefreshQuery.graphql";
import type { useCommunityImageUploadQuery } from "@/__generated__/useCommunityImageUploadQuery.graphql";

import type { MultiResolutionImageUploadResult } from "./useImage";
import { useImage } from "./useImage";

/**
 * Interface for community image operations
 */
export interface CommunityImageOperations {
  /**
   * Uploads a community image
   * @param uri - The image URI
   * @param communityId - The ID of the community (in relay ObjectId format)
   * @returns Promise with the upload result
   */
  uploadCommunityImage: (
    uri: string,
    communityId: string
  ) => Promise<MultiResolutionImageUploadResult>;

  /**
   * Uploads a new community image
   * @param uri - The image URI
   * @returns Promise with the upload result
   */
  uploadNewCommunityImage: (
    uri: string
  ) => Promise<MultiResolutionImageUploadResult>;

  /**
   * Deletes a community image
   * @param communityId - The ID of the community (in relay ObjectId format)
   * @returns Promise indicating success or failure
   */
  deleteCommunityImage: (communityId: string) => Promise<boolean>;
}

const _ = graphql`
  fragment useCommunityImage_community on Community @assignable {
    __typename
  }
`;

// GraphQL query for community image operations
const COMMUNITY_IMAGE_QUERY = graphql`
  query useCommunityImageUploadQuery($communityId: ID!) @updatable {
    viewer {
      community(communityId: $communityId) {
        imageUrl
        ...useCommunityImage_community
      }
    }
  }
`;

/**
 * Hook for handling community image operations
 * @returns Object with functions for community image operations
 */
export const useCommunityImage = (): CommunityImageOperations => {
  const { uploadImage, deleteImage, addCacheBusting } = useImage();
  const environment = useRelayEnvironment();

  /**
   * Uploads a community image and updates the Relay store
   * @param uri - The image URI
   * @param communityId - The ID of the community (in relay ObjectId format)
   * @returns Promise with the upload result
   */
  const uploadCommunityImage = useCallback(
    async (
      uri: string,
      communityId: string
    ): Promise<MultiResolutionImageUploadResult> => {
      if (!communityId) {
        throw new Error("Community ID is required");
      }

      const responseData = await uploadImage(
        uri,
        `/api/image/community/${communityId}/upload`
      );

      // Update the Relay store with the new community image URL
      commitLocalUpdate(environment, (store) => {
        const { updatableData } =
          store.readUpdatableQuery<useCommunityImageUploadQuery>(
            COMMUNITY_IMAGE_QUERY,
            { communityId: communityId }
          );

        if (updatableData.viewer?.community) {
          const imageUrl = updatableData.viewer.community.imageUrl;
          if (imageUrl) {
            updatableData.viewer.community.imageUrl = addCacheBusting(imageUrl);
          }

          console.log(
            "Updated community imageUrl fields:",
            updatableData.viewer.community
          );
        } else {
          console.log("Community not found in store");
        }
      });

      return responseData;
    },
    [uploadImage, environment, addCacheBusting]
  );

  /**
   * Uploads a community image and updates the Relay store
   * @param uri - The image URI
   * @param communityId - The ID of the community (in relay ObjectId format)
   * @returns Promise with the upload result
   */
  const uploadNewCommunityImage = useCallback(
    async (uri: string): Promise<MultiResolutionImageUploadResult> => {
      const responseData = await uploadImage(
        uri,
        `/api/image/community/upload`
      );

      return responseData;
    },
    [uploadImage]
  );

  /**
   * Deletes a community image and updates the Relay store
   * @param communityId - The ID of the community (in relay ObjectId format)
   * @returns Promise indicating success or failure
   */
  const deleteCommunityImage = useCallback(
    async (communityId: string): Promise<boolean> => {
      if (!communityId) {
        throw new Error("Community ID is required");
      }

      // Use the shared deleteImage function
      await deleteImage(`/api/image/community/${communityId}`);

      // Update the Relay store to remove the community image URL
      commitLocalUpdate(environment, (store) => {
        try {
          const { updatableData } =
            store.readUpdatableQuery<useCommunityImageUploadQuery>(
              COMMUNITY_IMAGE_QUERY,
              { communityId: communityId }
            );

          if (updatableData.viewer?.community) {
            // Set to null or a default image URL
            updatableData.viewer.community.imageUrl = null;
          }
        } catch (error) {
          console.error("Error updating Relay store:", error);
        }
      });

      return true;
    },
    [deleteImage, environment]
  );

  return {
    uploadCommunityImage,
    uploadNewCommunityImage,
    deleteCommunityImage,
  };
};
