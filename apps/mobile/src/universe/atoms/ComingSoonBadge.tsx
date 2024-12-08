import classNames from "classnames";
import { Text, View } from "react-native";

type Size = "sm" | "md" | "lg";

export const ComingSoonBadge = ({ size = "md" }: { size?: Size }) => {
  return (
    <View
      className={classNames(
        "mr-auto rounded-2xl bg-yellow-200 px-md py-sm",
        size === "sm" && "px-sm py-xs",
        size === "lg" && "px-lg py-md"
      )}
    >
      <Text
        className={classNames(
          "font-bold text-yellow-700",
          size === "sm" && "text-sm",
          size === "lg" && "text-lg"
        )}
      >
        Coming Soon
      </Text>
    </View>
  );
};