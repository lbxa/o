import classNames from "classnames";
import type { ButtonProps } from "react-native";
import { Text } from "react-native";

import { Touchable } from "./Touchable";

type Variant = "blue" | "red";

type VariantMatrix = {
  [key in Variant]: {
    back: string;
    front: string;
  };
};

const variantMatrix: VariantMatrix = {
  blue: {
    back: "bg-violet/30",
    front: "color-violet",
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
  variant = "blue",
  ...props
}: oButtonProps) => {
  // const onPressHandler = async (e: GestureResponderEvent) => {
  //   await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  //   onPress?.(e);
  // };

  // const { front, back } = variantMatrix[variant];

  // return (
  //   <TouchableOpacity
  //     className={classNames("rounded-md py-sm", variantMatrix[variant].back)}
  //     onPress={onPressHandler}
  //     {...props}
  //   >
  //     <Text
  //       className={classNames(
  //         "text-center font-bold",
  //         variantMatrix[variant].front
  //       )}
  //     >
  //       {title}
  //     </Text>
  //   </TouchableOpacity>
  // );

  return (
    <Touchable
      className={classNames("rounded-md py-sm", variantMatrix[variant].back)}
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
    </Touchable>
  );
};
