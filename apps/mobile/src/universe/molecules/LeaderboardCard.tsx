import { Text, View } from "react-native";

interface Props {
  rank: number;
  name: string;
  time: string;
  icon: string;
}

export const LeaderboardCard = ({ rank, name, time, icon }: Props) => {
  return (
    <View className="flex w-full flex-row justify-between bg-white p-2">
      <View className="flex flex-row gap-3">
        <Text>{rank}</Text>
        <Text>{name}</Text>
        <Text>{icon}</Text>
      </View>
      <Text>{time}</Text>
    </View>
  );
};
