import classNames from "classnames";
import type { ButtonProps as ReactNativeButtonProps } from "react-native";
import { Text } from "react-native";

import { OTouchable } from "./OTouchable";

type Type = "primary" | "secondary";
type Variant = "violet" | "red" | "indigo" | "navy" | "gray";

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
    back: "bg-red-800",
    front: "color-white",
  },
  gray: {
    back: "bg-gray-200",
    front: "color-gray-800",
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
    back: "bg-navy",
    front: "color-ivory",
  },
  red: {
    back: "bg-red-200",
    front: "color-red-800",
  },
  gray: {
    back: "bg-gray-300",
    front: "color-gray-800",
  },
};

type OButtonProps = {
  type?: Type;
  variant?: Variant;
  icon?: React.ReactElement;
  className?: string;
} & ReactNativeButtonProps;

export const OButton = ({
  title,
  icon,
  type = "primary",
  variant = "indigo",
  className,
  ...props
}: OButtonProps) => {
  const variantMatrix =
    type === "primary" ? primaryVariantMatrix : secondaryVariantMatrix;

  return (
    <OTouchable
      className={classNames("rounded-md py-sm px-md", className, {
        [variantMatrix[variant].back]: !props.disabled,
        "bg-gray-200": props.disabled,
      })}
      {...props}
    >
      {icon}
      <Text
        className={classNames("m-auto text-center font-bold", {
          [variantMatrix[variant].front]: !props.disabled,
          "text-gray-500": props.disabled,
        })}
      >
        {title}
      </Text>
    </OTouchable>
  );
};