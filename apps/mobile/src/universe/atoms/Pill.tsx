import classNames from "classnames";
import { Text, View } from "react-native";

import { Touchable } from "./Touchable";

interface PillProps {
  onPress?: () => void;
  label: string;
  selected?: boolean;
  variant?: "indigo" | "navy" | "violet";
  className?: string;
}

export const Pill = ({
  label,
  onPress,
  variant = "indigo",
  selected,
  className,
}: PillProps) => {
  return (
    <Touchable className={className} onPress={() => onPress?.()}>
      <View
        className={classNames("rounded-xl px-md py-sm", {
          "bg-ivory": !selected,
          "bg-indigo/30": variant === "indigo" && selected,
          "bg-navy/30": variant === "navy" && selected,
          "bg-violet/30": variant === "violet" && selected,
        })}
      >
        <Text
          className={classNames("font-bold", {
            "text-gray-700": !selected,
            "text-indigo": variant === "indigo" && selected,
            "text-navy": variant === "navy" && selected,
            "text-violet": variant === "violet" && selected,
          })}
        >
          {label}
        </Text>
      </View>
    </Touchable>
  );
};
