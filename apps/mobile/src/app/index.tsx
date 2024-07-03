import { Redirect } from "expo-router";
import React from "react";

import { useAuth } from "../utils/useAuth";

export default function App() {
  const { tok } = useAuth();

  if (!tok) {
    return <Redirect href="(auth)/login" />;
  }

  console.log("TOK", tok);

  return <Redirect href="(app)/home" />;
}
