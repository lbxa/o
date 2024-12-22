import classNames from "classnames";
import type { TextProps } from "react-native";
import { Text } from "react-native";

interface OTextProps {
  children: React.ReactNode;
  className?: string;
}

export const OText = ({
  children,
  className,
  ...props
}: OTextProps & TextProps) => {
  return (
    <Text
      className={classNames("text-black dark:text-ivory", className)}
      {...props}
    >
      {children}
    </Text>
  );
};
