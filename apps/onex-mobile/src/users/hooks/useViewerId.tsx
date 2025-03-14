import { useRouter } from "expo-router";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay";

import type { useViewerIdQuery } from "@/__generated__/useViewerIdQuery.graphql";

/**
 * The idea of this is that its run after the viewer is cached
 * @returns
 */
export const useViewerId = (): string => {
  const router = useRouter();
  const viewer = useLazyLoadQuery<useViewerIdQuery>(
    graphql`
      query useViewerIdQuery {
        viewer {
          id @required(action: THROW)
        }
      }
    `,
    {}
  );

  if (!viewer.viewer) {
    // there must always be a viewer logged in!
    router.replace("/auth/login");
    throw new Error("Viewer not found");
  }

  return viewer.viewer.id;
};
