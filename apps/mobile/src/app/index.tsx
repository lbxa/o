import { Redirect } from "expo-router";
import React from "react";

import { useAuth } from "../auth";

export default function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="(auth)/login" />;
  }

  return <Redirect href="(app)/home" />;
}
