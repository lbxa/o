import { Text, View } from "react-native";

interface PillArrayProps {
  pill1: string;
  pill2?: string;
  pill3?: string;
}

/**
 * A pill array is a component that displays three pills in a row.
 * The pills are displayed in order of priority, with the most important
 * pill on the left. There must be one!
 */
export const PillArray = ({ pill1, pill2, pill3 }: PillArrayProps) => {
  return (
    <View className="gap-sm flex flex-row">
      <Text className="bg-navy px-md py-sm z-30 rounded-xl font-bold text-white">
        {pill1}
      </Text>
      {pill2 && (
        <Text className="-ml-lg bg-indigo px-md py-sm pl-lg z-20 rounded-r-xl font-bold text-white">
          {pill2}
        </Text>
      )}
      {pill3 && (
        <Text className="-ml-lg bg-violet px-md py-sm pl-lg z-10 rounded-r-xl font-bold text-white">
          {pill3}
        </Text>
      )}
    </View>
  );
};
