import { View } from "react-native";

interface AvatarMoleculesProps {
  count: number;
}
export const AvatarMolecules = ({ count }: AvatarMoleculesProps) => {
  if (count <= 0) {
    if (__DEV__) {
      console.debug(
        "AvatarArray: arrayCount is 0; Verify DDD allows this to happen?"
      );
    }
    return null;
  }

  if (count === 1) {
    return (
      <View className="size-10 rounded-full border-2 border-white bg-gray-500" />
    );
  }

  return (
    <View className="relative mr-xs h-12 w-16">
      <View className="absolute left-0 top-0 z-30 size-10 rounded-full border-2 border-white bg-gray-500" />
      {count > 1 && (
        <View className="absolute left-10 top-0 z-20 size-7 rounded-full border-2 border-white bg-gray-400" />
      )}
      {count > 2 && (
        <View className="absolute bottom-0 left-9 z-10 size-5 rounded-full border-2 border-white bg-gray-300" />
      )}
    </View>
  );
};
