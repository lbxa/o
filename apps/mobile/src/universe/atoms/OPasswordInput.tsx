import Eye from "@assets/icons/eye.svg";
import EyeSlash from "@assets/icons/eye-slash.svg";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { Text, View } from "react-native";

import { OTouchable } from "./OTouchable";
import type { PrimaryTextInputProps } from "./PrimaryTextInput";
import { PrimaryTextInput } from "./PrimaryTextInput";
import type { PrimaryTextInputControlProps } from "./PrimaryTextInputControl";

export const OPasswordInput = (
  props: PrimaryTextInputControlProps &
    PrimaryTextInputProps &
    Omit<TextInputProps, "className">
) => {
  const [visible, setVisible] = useState(false);

  return (
    <View className="mb-md">
      <View className="relative flex flex-row">
        <PrimaryTextInput
          className="grow"
          secureTextEntry={!visible}
          {...props}
        />
        <OTouchable
          className="absolute inset-y-0 right-0 m-auto rounded-r-lg bg-inherit pr-sm backdrop-blur-md"
          onPress={() => setVisible((prev) => !prev)}
        >
          <View className="m-auto">
            {visible ? (
              <Eye width={20} height={20} />
            ) : (
              <EyeSlash width={20} height={20} />
            )}
          </View>
        </OTouchable>
      </View>
      {props.error && (
        <Text className="mt-sm px-2 color-red-900">{props.errorMessage}</Text>
      )}
    </View>
  );
};
