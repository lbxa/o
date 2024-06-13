import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import classNames from "classnames";
export interface PrimaryTextInputProps {
  error?: boolean;
}

export const PrimaryTextInput = ({
  className,
  error,
  ...props
}: TextInputProps & PrimaryTextInputProps) => {
  const textInputClass = classNames(
    "bg-white rounded-lg px-2 py-3",
    className,
    {
      "bg-red-100 color-red-900": error,
    }
  );

  return <TextInput className={textInputClass} {...props} />;
};
