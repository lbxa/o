import classNames from "classnames";
import { Image, View } from "react-native";

interface AvatarArrayProps {
  // arrayCount: number;
  userAvatars: { avatarUrl: string }[];
}
export const AvatarArray = ({ userAvatars }: AvatarArrayProps) => {
  const MINIMUM_MEMBERS_TO_SHOW = 3;
  if (userAvatars.length <= 0) {
    if (__DEV__) {
      console.debug(
        "AvatarArray: arrayCount is 0; Verify DDD allows this to happen?"
      );
    }
    return null;
  }

  return (
    <View className="flex-row items-center">
      {Array.from(
        { length: Math.min(MINIMUM_MEMBERS_TO_SHOW, userAvatars.length) },
        (_, i) => (
          <Image
            key={i}
            source={{ uri: userAvatars[i].avatarUrl }}
            className={classNames("size-10 rounded-full border border-white", {
              "-ml-4": i > 0,
              "z-30 bg-gray-500": i === 0,
              "z-20 bg-gray-400": i === 1,
              "z-10 bg-gray-300": i === 2,
            })}
          />
        )
      )}
    </View>
  );
};
