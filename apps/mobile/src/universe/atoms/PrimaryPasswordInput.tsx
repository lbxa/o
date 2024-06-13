import { useState } from "react";
import type { PrimaryTextInputProps } from "./PrimaryTextInput";
import { PrimaryTextInput } from "./PrimaryTextInput";
import type { TextInputProps } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Haptics from "expo-haptics";

{
  /* <FontAwesome name="eye-slash" size={24} color="black" />; */
}

export const PrimaryPasswordInput = (
  props: PrimaryTextInputProps & Omit<TextInputProps, "className">
) => {
  const [visible, setVisible] = useState(false);

  const onPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setVisible(!visible);
  };

  return (
    <View className="bg-white rounded-lg mb-md flex flex-row relative">
      <PrimaryTextInput className="grow" secureTextEntry={visible} {...props} />
      <TouchableOpacity
        className="absolute inset-y-0 right-0 pr-sm m-auto backdrop-blur-md bg-inherit rounded-r-lg"
        onPress={onPress}
      >
        <Text className="m-auto">{visible ? "S" : "H"}</Text>
      </TouchableOpacity>
    </View>
  );
};
