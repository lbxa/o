import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Card } from '@universe/atoms';
import { LeaderboardCard } from '@universe/molecules';

export default function Leaderboard() {
  interface Person {rank: number, name: string; time: string; icon: string}
  const leaderboardData: Person[] = [
      { rank: 1, name: "Jamie", time: "11 min 05 sec", icon: "↑3" },
      { rank: 2, name: "Lucas", time: "10 min 45 sec", icon: "↓1" },
      { rank: 3, name: "Sam", time: "10 min 40 sec", icon: "↑7" },
      { rank: 4, name: "Jake", time: "9 min 13 sec", icon: "↑5" },
      { rank: 5, name: "Tom", time: "9 min 00 sec", icon: "↓3" },
      { rank: 6, name: "Amy", time: "8 min 39 sec", icon: "↑12" },
      { rank: 7, name: "Jay", time: "8 min 32 sec", icon: "↓2" }
    ];
  
  return (
    <ScrollView>
      <View className="flex px-4 w-full justify-center mt-5">
        <Card>
          <Text className='text-xl font-bold mb-2'>Welcome to GymX's weekly challenge</Text>
          <Text>
            Take on the wall sit challenge! Hold the position as long as you can. 
            The top male and female with the longest wall sits will each win three 
            free classes.
          </Text>
        </Card>

        <Text className="text-3xl font-black mb-4">Position</Text>
        <LeaderboardCard {...leaderboardData[0]}/>

        <Text className="text-3xl font-black my-5">Leaderboard</Text>
        
        {leaderboardData.map((person, rank) => {
          return (
            <LeaderboardCard key={rank} {...person}/>
          );
        })} 

        <Text className="text-3xl font-black my-5">Past Competitions</Text>

        <Text className="text-3xl font-black my-5">Rank</Text>

        <Link href="/profile">Go to your user profile</Link>
      </View>
    </ScrollView>
  );
}
