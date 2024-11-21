import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useLazyLoadQuery } from "react-relay";

import type { UserProfileQuery } from "@/__generated__/UserProfileQuery.graphql";
import { useZustStore } from "@/state";
import { USER_PROFILE_QUERY } from "@/users";
import { useToken } from "@/utils";

export default function App() {
  const { token } = useToken();
  const { setActiveUser } = useZustStore();

  const userProfile = useLazyLoadQuery<UserProfileQuery>(
    USER_PROFILE_QUERY,
    {}
  );

  useEffect(() => {
    if (userProfile.viewer?.user && token) {
      setActiveUser(userProfile.viewer.user);
    }
  }, [setActiveUser, token, userProfile.viewer?.user]);

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)/home" />;
}
