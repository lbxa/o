import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@universe/atoms';
import type { LinkProps } from 'expo-router/build/link/Link';

const CustomLink = (props: LinkProps) => {
  return (
    <Link className="py-lg rounded-lg text-blue-500 text-xl text-center bg-blue-200 mb-md" {...props}>{props.children}</Link>
  );
};

const Home = () => {
  return (
    <SafeAreaView>
      <Card>
        <Text className="font-mono text-center text-3xl font-light">CHAMP</Text>
      </Card>
      <View>
        <CustomLink href="(auth)/sign-in">Sign in</CustomLink> 
        <CustomLink href="(auth)/sign-up">Sign up</CustomLink> 
        <CustomLink href="(tabs)/home">Home</CustomLink> 
      </View>
    </SafeAreaView>
  );
};

export default Home;
