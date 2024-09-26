import classNames from "classnames";
import type { ButtonProps as ReactNativeButtonProps } from "react-native";
import { Text } from "react-native";

import { Touchable } from "./Touchable";

type Type = "primary" | "secondary";
type Variant = "violet" | "red" | "indigo" | "navy";

type VariantMatrix = {
  [key in Variant]: {
    back: string;
    front: string;
  };
};

const primaryVariantMatrix: VariantMatrix = {
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

const secondaryVariantMatrix: VariantMatrix = {
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

type ButtonProps = {
  type?: Type;
  variant?: Variant;
  icon?: React.ReactElement;
  className?: string;
} & ReactNativeButtonProps;

export const Button = ({
  title,
  type = "primary",
  variant = "indigo",
  className,
  ...props
}: ButtonProps) => {
  const variantMatrix =
    type === "primary" ? primaryVariantMatrix : secondaryVariantMatrix;

  return (
    <Touchable
      className={classNames(
        "rounded-md py-sm",
        variantMatrix[variant].back,
        className
      )}
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
