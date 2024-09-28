import { Redirect } from "expo-router";
import React from "react";

import { useToken } from "../utils/useToken";

export default function App() {
  const { token } = useToken();

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)/home" />;
}
