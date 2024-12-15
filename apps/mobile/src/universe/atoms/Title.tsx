import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { Text } from "react-native";

export const Title: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <Text
      className={classNames(
        "text-3xl font-bold mb-sm dark:text-ivory text-black",
        className
      )}
    >
      {children}
    </Text>
  );
};
