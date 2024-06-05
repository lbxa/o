import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home" />
        <Tabs.Screen name="leaderboard" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="settings" />
      </Tabs>
    </>
  );
}
