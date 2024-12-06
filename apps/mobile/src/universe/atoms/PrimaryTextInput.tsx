import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import classNames from "classnames";
import { forwardRef } from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";

export type PrimaryTextInputProps = {
  error?: boolean;
  bottomSheet?: boolean;
} & TextInputProps;

export const PrimaryTextInput = forwardRef<TextInput, PrimaryTextInputProps>(
  ({ className, error, bottomSheet, ...props }, ref) => {
    const textInputClass = classNames(
      "bg-ivory rounded-lg px-2 py-3",
      className,
      {
        "bg-red-200 color-red-900": error,
      }
    );

    if (bottomSheet) {
      return <BottomSheetTextInput className={textInputClass} {...props} />;
    }

    return <TextInput ref={ref} className={textInputClass} {...props} />;
  }
);
