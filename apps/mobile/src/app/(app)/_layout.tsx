import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="leaderboard" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen
        name="community/[id]"
        options={{
          href: null, // This hides the tab but keeps it in the navigation
        }}
      />
    </Tabs>
  );
}
