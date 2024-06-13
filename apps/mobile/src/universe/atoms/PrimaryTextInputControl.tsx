import type { TextInputProps } from "react-native";
import { Text, View } from "react-native";
import type { PrimaryTextInputProps } from "./PrimaryTextInput";
import { PrimaryTextInput } from "./PrimaryTextInput";

export interface PrimaryTextInputControlProps {
  errorMessage?: string;
}

export const PrimaryTextInputControl = ({
  className,
  error,
  errorMessage,
  ...props
}: TextInputProps & PrimaryTextInputProps & PrimaryTextInputControlProps) => {
  return (
    <View className={className}>
      <PrimaryTextInput {...props} error={error} />
      {error && (
        <Text className="px-2 mt-sm color-red-900">{errorMessage}</Text>
      )}
    </View>
  );
};
