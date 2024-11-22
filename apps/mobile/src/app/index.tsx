import { Redirect } from "expo-router";

import { useToken } from "@/utils";

// TODO
/**Remove this component, create auth route instead,
 * it causes a screen redirect for no reason.
 */
export default function App() {
  const { token } = useToken();

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(root)/home" />;
}
