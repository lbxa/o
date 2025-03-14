import type { User } from "@o/onex-api-gql";
import classNames from "classnames";
import { useMemo } from "react";
import { Image, View } from "react-native";

import { OText } from "../universe/atoms";

export type AvatarOutline = "green" | "gray" | "ivory";

export const UserAvatar = ({
  user,
  className,
  outline,
  size = "md",
}: {
  user: User;
  size?: "sm" | "md" | "lg";
  outline?: AvatarOutline;
  className?: string;
}) => {
  const sizeClasses = {
    sm: "size-11",
    md: "size-[60px]",
    lg: "size-[200px]",
  };

  const textSizeClasses = {
    sm: "text-lg leading-11",
    md: "text-3xl leading-[60px]",
    lg: "text-6xl leading-[200px]",
  };

  const borders = useMemo(
    () => ({
      "border border-green-500": outline === "green",
      "border border-gray-500": outline === "gray",
      "border border-ivory": outline === "ivory",
    }),
    [outline]
  );

  // const userAvatarFragment = useFragment<UserAvatar_user$key>(
  //   graphql`
  //     fragment UserAvatar_user on User
  //     @argumentDefinitions(
  //       quality: { type: "ImageQuality", defaultValue: MED }
  //     ) {
  //       avatarUrl(quality: $quality)
  //     }
  //   `,
  //   userAvatarFragmentRef
  // );

  // If user has an avatar URL, display the image
  if (user.avatarUrl) {
    return (
      <View
        className={classNames(
          "flex items-center justify-center rounded-full overflow-hidden",
          sizeClasses[size],
          className,
          borders
        )}
      >
        <Image
          className={classNames("w-full h-full")}
          source={{ uri: user.avatarUrl, cache: "reload" }}
        />
      </View>
    );
  }

  // If no avatar URL is available, display initials
  return (
    <View
      className={classNames(
        "flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 box-content",
        sizeClasses[size],
        className,
        borders
      )}
    >
      <OText
        className={classNames(
          "flex items-center justify-center font-bold text-gray-600 dark:text-gray-400",
          textSizeClasses[size]
        )}
      >
        {user.firstName?.charAt(0)}
        {user.lastName?.charAt(0)}
      </OText>
    </View>
  );
};
