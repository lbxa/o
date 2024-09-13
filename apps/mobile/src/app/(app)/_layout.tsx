import Entypo from "@expo/vector-icons/Entypo";
import { Redirect, Tabs } from "expo-router";
import React from "react";

import Home from "../../../assets/icons/home.svg";
import { useAuth } from "../../utils/useAuth";

export default function AppLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            // <Entypo size={28} name="home" color={color} />
            <Home width={28} color={color} fill={color} />
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
        name="community"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      {/* <Tabs.Screen
        name="community/[community]"
        options={{
          title: "Community",
          href: null, // This hides the tab but keeps it in the navigation structure
        }}
      /> */}
      {/* <Tabs.Screen
        name="community/create"
        options={{
          title: "Create a Community",
          href: null, // This hides the tab but keeps it in the navigation structure
        }}
      />
      <Tabs.Screen
        name="community/search"
        options={{
          title: "Search a Community",
          href: null, // This hides the tab but keeps it in the navigation structure
        }}
      /> */}
    </Tabs>
  );
}
