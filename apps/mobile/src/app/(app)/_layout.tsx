import Entypo from "@expo/vector-icons/Entypo";
import { Redirect, Tabs } from "expo-router";
import React from "react";

import HomeIcon from "../../../assets/icons/home.svg";
import PeopleIcon from "../../../assets/icons/people.svg";
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
            <HomeIcon width={28} color={color} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <PeopleIcon width={28} color={color} fill={color} />
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
    </Tabs>
  );
}
