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
    <View className="flex flex-row gap-sm">
      <Text className="z-30 rounded-xl bg-navy px-md py-sm font-bold text-ivory dark:bg-indigo dark:text-ivory">
        {pill1}
      </Text>
      {pill2 && (
        <Text className="z-20 -ml-lg rounded-r-xl bg-indigo px-md py-sm pl-lg font-bold text-ivory dark:bg-indigo-300 dark:text-indigo-900">
          {pill2}
        </Text>
      )}
      {pill3 && (
        <Text className="z-10 -ml-lg rounded-r-xl bg-violet px-md py-sm pl-lg font-bold text-ivory dark:bg-violet-300 dark:text-violet-900">
          {pill3}
        </Text>
      )}
    </View>
  );
};
