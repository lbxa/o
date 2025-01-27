import classNames from "classnames";
import type { TextProps } from "react-native";
import { Text } from "react-native";

import type { TextSize } from "@/universe/atoms/atom.types";

interface OTextProps {
  children: React.ReactNode;
  className?: string;
  error?: boolean;
  gray?: boolean;
  size?: TextSize;
}

export const OText = ({
  children,
  className,
  error,
  gray,
  size = "md",
  ...props
}: OTextProps & TextProps) => {
  return (
    <Text
      className={classNames("text-black dark:text-ivory", className, {
        "text-red-900 dark:text-red-500": error,
        "text-gray-500 dark:text-gray-300": gray,
        "text-sm": size === "sm",
        "text-md": size === "md",
        "text-lg": size === "lg",
        "text-xl": size === "xl",
        "text-2xl": size === "2xl",
        "text-3xl": size === "3xl",
        "text-4xl": size === "4xl",
        "text-5xl": size === "5xl",
      })}
      {...props}
    >
      {children}
    </Text>
  );
};
