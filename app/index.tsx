import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function RootLayout() {
  return (
    <View className='flex w-full'>
      <Text className='m-auto'>
        Home Page
      </Text>
      <Link href="/blog" className='ml-md'>Go to blog</Link>
      <Link href="/modal">Present modal</Link>
    </View>
  );
}