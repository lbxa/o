import { Card } from "@universe/atoms";
import { Ozone } from "@universe/molecules";
import { Link } from "expo-router";
import type { LinkProps } from "expo-router/build/link/Link";
import React from "react";
import { Text, View } from "react-native";

const CustomLink = (props: LinkProps) => {
  return (
    <Link
      className="py-lg text-blue-500 text-xl text-center bg-blue-200 mb-md"
      {...props}
    >
      {props.children}
    </Link>
  );
};

const App = () => {
  return (
    <Ozone>
      <Card>
        <Text className="font-mono text-center text-3xl font-light">CHAMP</Text>
      </Card>
      <View>
        <CustomLink href="(auth)/login">Login</CustomLink>
        <CustomLink href="(auth)/sign-up">Sign up</CustomLink>
        <CustomLink href="(tabs)/home">Home</CustomLink>
      </View>
    </Ozone>
  );
};

export default App;
