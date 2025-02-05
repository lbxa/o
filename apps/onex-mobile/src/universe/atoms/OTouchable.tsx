import type { ImpactFeedbackStyle } from "expo-haptics";
import * as Haptics from "expo-haptics";
import type { PropsWithChildren } from "react";
import React from "react";
import type {
  GestureResponderEvent,
  TouchableOpacityProps,
} from "react-native";
import { TouchableOpacity } from "react-native";

/**
 * Simply a wrapper for haptics providing clicking consistency across
 * the entire application.
 */
type OTouchableProps = {
  variant?: ImpactFeedbackStyle;
} & TouchableOpacityProps;

export const OTouchable: React.FC<PropsWithChildren<OTouchableProps>> = ({
  variant = Haptics.ImpactFeedbackStyle.Rigid,
  onPress,
  children,
  ...props
}) => {
  const onPressHandler = async (e: GestureResponderEvent) => {
    await Haptics.impactAsync(variant);
    onPress?.(e);
  };

  return (
    <TouchableOpacity onPress={onPressHandler} {...props}>
      {children}
    </TouchableOpacity>
  );
};
