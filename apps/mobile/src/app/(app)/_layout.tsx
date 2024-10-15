import CircleIcon from "@assets/icons/circle.svg";
import HomeIcon from "@assets/icons/home.svg";
import PeopleIcon from "@assets/icons/people.svg";
import { Redirect, Tabs } from "expo-router";

import { useToken } from "@/utils/useToken";

export default function AppLayout() {
  const { token } = useToken();

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: "#5955eb",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => <PeopleIcon width={28} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <CircleIcon width={25} fill={color} />,
        }}
      />
    </Tabs>
  );
}
