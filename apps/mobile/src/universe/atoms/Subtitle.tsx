import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { Text } from "react-native";

export const Subtitle: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <Text
      className={classNames(
        "mb-md text-sm text-gray-500 dark:text-gray-200",
        className
      )}
    >
      {children}
    </Text>
  );
};
