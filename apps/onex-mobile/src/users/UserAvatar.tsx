import type { User } from "@o/onex-api-gql";
import classNames from "classnames";
import { View } from "react-native";

import { OText } from "../universe/atoms";

export type AvatarOutline = "green";

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

  return (
    <View
      className={classNames(
        "flex items-center justify-center rounded-full bg-gray-300 dark:bg-white/20 box-content",
        sizeClasses[size],
        className,
        {
          "border-2 border-green-500": outline === "green",
        }
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
