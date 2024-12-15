import Eye from "@assets/icons/eye.svg";
import EyeSlash from "@assets/icons/eye-slash.svg";
import { forwardRef, useState } from "react";
import type { TextInput } from "react-native";
import type { TextInputProps } from "react-native";
import { Text, View } from "react-native";

import { useSvgFill } from "../../utils";
import { OTouchable } from "./OTouchable";
import type { PrimaryTextInputProps } from "./PrimaryTextInput";
import { PrimaryTextInput } from "./PrimaryTextInput";
import type { PrimaryTextInputControlProps } from "./PrimaryTextInputControl";

export const OPasswordInput = forwardRef<
  TextInput,
  PrimaryTextInputControlProps &
    PrimaryTextInputProps &
    Omit<TextInputProps, "className">
>((props, ref) => {
  const svgFill = useSvgFill();
  const [visible, setVisible] = useState(false);

  return (
    <View className="mb-md">
      <View className="relative flex flex-row">
        <PrimaryTextInput
          ref={ref}
          className="grow"
          secureTextEntry={!visible}
          {...props}
        />
        <OTouchable
          className="pr-sm absolute inset-y-0 right-0 m-auto rounded-r-lg bg-inherit backdrop-blur-md"
          onPress={() => setVisible((prev) => !prev)}
        >
          <View className="m-auto">
            {visible ? (
              <Eye width={20} height={20} fill={svgFill} />
            ) : (
              <EyeSlash width={20} height={20} fill={svgFill} />
            )}
          </View>
        </OTouchable>
      </View>
      {props.error && (
        <Text className="mt-sm color-red-900 px-2 dark:text-red-200">
          {props.errorMessage}
        </Text>
      )}
    </View>
  );
});

OPasswordInput.displayName = "OPasswordInput";
