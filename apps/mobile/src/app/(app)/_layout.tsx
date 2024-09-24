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
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            // <Entypo size={28} name="home" color={color} />
            <HomeIcon fill={focused ? "#5955eb" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, focused }) => (
            <PeopleIcon width={28} fill={focused ? "#5955eb" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="circle"
              size={28}
              color={focused ? "#5955eb" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
