import { forwardRef } from "react";
import type { TextInput } from "react-native";
import { Text, View } from "react-native";

import type { PrimaryTextInputProps } from "./PrimaryTextInput";
import { PrimaryTextInput } from "./PrimaryTextInput";

export interface PrimaryTextInputControlProps {
  errorMessage?: string;
}

export const PrimaryTextInputControl = forwardRef<
  TextInput,
  PrimaryTextInputControlProps & PrimaryTextInputProps
>(({ error, errorMessage, className, ...props }, ref) => (
  <View className={className}>
    <PrimaryTextInput ref={ref} {...props} error={error} />
    {error && errorMessage && (
      <Text className="pl-sm text-red-900">{errorMessage}</Text>
    )}
  </View>
));
