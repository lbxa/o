import classNames from "classnames";
import type { ButtonProps as ReactNativeButtonProps } from "react-native";
import { ActivityIndicator, Text, View } from "react-native";

import { OTouchable } from "./OTouchable";

export type OButtonType = "primary" | "secondary";
export type OButtonSize = "default" | "large";
export type OButtonVariant = "violet" | "red" | "indigo" | "navy" | "gray";

type VariantMatrix = Record<
  OButtonVariant,
  {
    back: string;
    front: string;
  }
>;

const primaryVariantMatrix: VariantMatrix = {
  violet: {
    back: "bg-violet",
    front: "text-ivory",
  },
  indigo: {
    back: "bg-indigo",
    front: "text-ivory",
  },
  navy: {
    back: "bg-navy",
    front: "text-ivory",
  },
  red: {
    back: "bg-red-500",
    front: "text-ivory",
  },
  gray: {
    back: "bg-gray-200",
    front: "text-gray-800",
  },
};

const secondaryVariantMatrix: VariantMatrix = {
  violet: {
    back: "bg-violet/30",
    front: "text-violet",
  },
  indigo: {
    back: "bg-indigo/30",
    front: "text-indigo",
  },
  navy: {
    back: "bg-navy",
    front: "text-ivory",
  },
  red: {
    back: "bg-red-200",
    front: "text-red-800",
  },
  gray: {
    back: "bg-gray-300",
    front: "text-gray-800",
  },
};

type OButtonProps = {
  type?: OButtonType;
  size?: OButtonSize;
  variant?: OButtonVariant;
  icon?: React.ReactElement;
  loading?: boolean;
  className?: string;
} & ReactNativeButtonProps;

export const OButton = ({
  title,
  icon,
  type = "secondary",
  variant = "indigo",
  size = "default",
  loading = false,
  className,
  ...props
}: OButtonProps) => {
  const variantMatrix =
    type === "primary" ? primaryVariantMatrix : secondaryVariantMatrix;

  const buttonContent = (
    <View className="gap-sm my-auto flex flex-row items-center">
      {icon}
      <Text
        className={classNames("m-auto text-center font-bold", {
          [variantMatrix[variant].front]: !props.disabled,
          "text-gray-500": props.disabled,
          "text-2xl": size === "large",
        })}
      >
        {title}
      </Text>
    </View>
  );

  return (
    <OTouchable
      className={classNames("rounded-xl py-sm px-md", className, {
        [variantMatrix[variant].back]: !props.disabled,
        "bg-gray-200": props.disabled,
      })}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantMatrix[variant].front} size="small" />
      ) : (
        buttonContent
      )}
    </OTouchable>
  );
};
