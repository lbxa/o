import { useRouter } from "expo-router";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay";

import type { useActiveUserIdQuery } from "@/__generated__/useActiveUserIdQuery.graphql";

export const useActiveUserId = (): string => {
  const router = useRouter();
  const viewer = useLazyLoadQuery<useActiveUserIdQuery>(
    graphql`
      query useActiveUserIdQuery {
        viewer @required(action: THROW) {
          user {
            id
          }
        }
      }
    `,
    {}
  );

  if (!viewer.viewer.user) {
    // there must always be a viewer logged in!
    router.replace("/auth/login");
    throw new Error("Viewer not found");
  }

  return viewer.viewer.user.id;
};
