import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";

export const PrimaryTextInput = (props: TextInputProps) => {
  return (
    <TextInput className="bg-white px-2 py-3 rounded-lg mb-md" {...props}/>
  );
};