import Entypo from "@expo/vector-icons/Entypo";
import { Redirect, Tabs } from "expo-router";

import { useAuth } from "../../auth";

export default function AppLayout() {
  // const { session } = useAuth();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="circle" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community/[community]"
        options={{
          title: "Community",
          href: null, // This hides the tab but keeps it in the navigation structure
        }}
      />
    </Tabs>
  );
}
