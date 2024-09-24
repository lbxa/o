import classNames from "classnames";
import type { ButtonProps } from "react-native";
import { Text } from "react-native";

import { Touchable } from "./Touchable";

type Variant = "violet" | "red" | "indigo" | "navy";

type VariantMatrix = {
  [key in Variant]: {
    back: string;
    front: string;
  };
};

const variantMatrix: VariantMatrix = {
  violet: {
    back: "bg-violet/30",
    front: "color-violet",
  },
  indigo: {
    back: "bg-indigo/30",
    front: "color-indigo",
  },
  navy: {
    back: "bg-navy/30",
    front: "color-navy",
  },
  red: {
    back: "bg-red-200",
    front: "color-red-800",
  },
};

type oButtonProps = {
  variant?: Variant;
  icon?: React.ReactElement;
} & ButtonProps;

export const PrimaryButton = ({
  title,
  variant = "indigo",
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
