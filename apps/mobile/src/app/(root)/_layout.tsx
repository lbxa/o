import CircleIcon from "@assets/icons/circle.svg";
import HomeIcon from "@assets/icons/home.svg";
import PeopleIcon from "@assets/icons/people.svg";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";

import { AppRoot } from "@/root";
import { useToken } from "@/utils/useToken";

export default function RootLayout() {
  const router = useRouter();
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [router, token]);

  return (
    <AppRoot>
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
    </AppRoot>
  );
}
