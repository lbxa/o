import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";

import type { PrimaryTextInputProps } from "./PrimaryTextInput";
import { PrimaryTextInput } from "./PrimaryTextInput";
import type { PrimaryTextInputControlProps } from "./PrimaryTextInputControl";

{
  /* <FontAwesome name="eye-slash" size={24} color="black" />; */
}

export const PrimaryPasswordInput = (
  props: PrimaryTextInputControlProps &
    PrimaryTextInputProps &
    Omit<TextInputProps, "className">
) => {
  const [visible, setVisible] = useState(false);

  const onPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setVisible(!visible);
  };

  return (
    <View className="mb-md">
      <View className="flex flex-row relative">
        <PrimaryTextInput
          className="grow"
          secureTextEntry={visible}
          {...props}
        />
        <TouchableOpacity
          className="absolute inset-y-0 right-0 pr-sm m-auto backdrop-blur-md bg-inherit rounded-r-lg"
          onPress={onPress}
        >
          <View className="m-auto">
            {visible ? (
              <Entypo name="eye" size={18} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={18} color="black" />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {props.error && (
        <Text className="px-2 mt-sm color-red-900">{props.errorMessage}</Text>
      )}
    </View>
  );
};
