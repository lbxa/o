import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Blog() {
  return (
    <View>
      <Text className="bg-slate-400">Blog page</Text>
      <Link href="/profile">Go to profile</Link>
    </View>
  );
}
