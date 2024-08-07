import classNames from "classnames";
import * as Haptics from "expo-haptics";
import type { ButtonProps, GestureResponderEvent } from "react-native";
import { Text, TouchableOpacity } from "react-native";

type Variant = "blue" | "red";

type VariantMatrix = {
  [key in Variant]: {
    back: string;
    front: string;
  };
};

const variantMatrix: VariantMatrix = {
  blue: {
    back: "bg-blue-200",
    front: "color-blue-800",
  },
  red: {
    back: "bg-red-200",
    front: "color-red-800",
  },
};

type oButtonProps = {
  variant?: Variant;
} & ButtonProps;

export const PrimaryButton = ({
  title,
  onPress,
  variant = "blue",
  ...props
}: oButtonProps) => {
  const onPressHandler = async (e: GestureResponderEvent) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    onPress?.(e);
  };

  // const { front, back } = variantMatrix[variant];

  return (
    <TouchableOpacity
      className={classNames("rounded-md py-sm", variantMatrix[variant].back)}
      onPress={onPressHandler}
      {...props}
    >
      <Text
        className={classNames(
          "text-center font-bold",
          variantMatrix[variant].front
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
