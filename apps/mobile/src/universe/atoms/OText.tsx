import classNames from "classnames";
import { Text } from "react-native";

interface OTextProps {
  children: React.ReactNode;
  className?: string;
}

export const OText = ({ children, className }: OTextProps) => {
  return (
    <Text className={classNames("text-black dark:text-ivory", className)}>
      {children}
    </Text>
  );
};
