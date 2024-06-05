import { useState } from "react";
import { PrimaryTextInput } from "./PrimaryTextInput";
import type { TextInputProps} from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

{/* <FontAwesome name="eye-slash" size={24} color="black" />; */}

export const PrimaryPasswordInput = (props: TextInputProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <View className="bg-white px-2 py-3 rounded-lg mb-md flex flex-row">
      <PrimaryTextInput className="grow" secureTextEntry={visible} {...props}/>
      <TouchableOpacity className="pr-sm" onPress={() => setVisible(!visible)}>
        <Text>{visible ? 'S' : 'H'}</Text>
      </TouchableOpacity>
    </View>
  );
};