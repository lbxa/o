import { Redirect } from "expo-router";
import React from "react";

import { useAuth } from "../utils/useAuth";

export default function App() {
  const { tok } = useAuth();

  if (!tok) {
    return <Redirect href="(auth)/login" />;
  }

  return <Redirect href="(app)/home" />;
}
