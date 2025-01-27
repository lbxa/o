import { forwardRef } from "react";
import type { TextInput } from "react-native";
import { View } from "react-native";

import { OText } from "./OText";
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
      <OText className="pl-sm pt-sm" error>
        {errorMessage}
      </OText>
    )}
  </View>
));
