import { useState } from "react";
import { PrimaryTextInput } from "./PrimaryTextInput";
import type { TextInputProps } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Haptics from "expo-haptics";

{
  /* <FontAwesome name="eye-slash" size={24} color="black" />; */
}

export const PrimaryPasswordInput = (props: TextInputProps) => {
  const [visible, setVisible] = useState(false);

  const onPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setVisible(!visible);
  };

  return (
    <View className="bg-white px-2 py-3 rounded-lg mb-md flex flex-row">
      <PrimaryTextInput className="grow" secureTextEntry={visible} {...props} />
      <TouchableOpacity className="pr-sm" onPress={onPress}>
        <Text>{visible ? "S" : "H"}</Text>
      </TouchableOpacity>
    </View>
  );
};
