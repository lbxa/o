import type { User } from "@o/api-gql";
import classNames from "classnames";
import { View } from "react-native";

import { OText } from "../universe/atoms";

export const UserAvatar = ({
  user,
  className,
  size = "md",
}: {
  user: User;
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "size-[40px]",
    md: "size-[60px]",
    lg: "size-[200px]",
  };

  const textSizeClasses = {
    sm: "text-xl leading-[40px]",
    md: "text-3xl leading-[60px]",
    lg: "text-6xl leading-[200px]",
  };

  return (
    <View
      className={classNames(
        "flex items-center justify-center rounded-full bg-gray-300 dark:bg-white/20",
        sizeClasses[size],
        className
      )}
    >
      <OText
        className={classNames(
          "flex items-center justify-center font-bold",
          textSizeClasses[size]
        )}
      >
        {user.firstName?.charAt(0)}
        {user.lastName?.charAt(0)}
      </OText>
    </View>
  );
};
