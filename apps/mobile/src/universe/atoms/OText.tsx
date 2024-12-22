import classNames from "classnames";
import type { TextProps } from "react-native";
import { Text } from "react-native";

interface OTextProps {
  children: React.ReactNode;
  className?: string;
  error?: boolean;
}

export const OText = ({
  children,
  className,
  error,
  ...props
}: OTextProps & TextProps) => {
  return (
    <Text
      className={classNames("text-black dark:text-ivory", className, {
        "text-red-900 dark:text-red-500": error,
      })}
      {...props}
    >
      {children}
    </Text>
  );
};
