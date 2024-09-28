// import SearchIcon from "@assets/icons/search.svg";
// import { PrimaryTextInputControl } from "@universe/atoms";
// import { Link } from "expo-router";
// import React, { useEffect } from "react";
// import { FlatList, View } from "react-native";
// import { graphql, useFragment } from "react-relay";

// import type { UserSearchFriendsFragment$key } from "../../__generated__/UserSearchFriendsFragment.graphql";
// import { UserInviteCard } from "./UserInviteCard";

// const USER_FRIENDS_LIST_FRAGMENT = graphql`
//   fragment UserSearchFriendsFragment on Viewer {
//     user {
//       searchFriends {
//         id
//         ...UserFragment
//       }
//     }
//   }
// `;

// interface UserListProps {
//   viewer: UserSearchFriendsFragment$key;
//   searchQuery: string;
//   onSearchChange: (term: string) => void;
// }

// export const UserList = ({
//   viewer,
//   searchQuery,
//   onSearchChange,
// }: UserListProps) => {
//   const data = useFragment(USER_FRIENDS_LIST_FRAGMENT, viewer);

//   useEffect(() => {
//     console.log("UserList mounted");
//     return () => {
//       console.log("UserList unmounted");
//     };
//   }, []);

//   return (
//     <View className="flex-1 px-md">
//       <View className="h-full">
//         <View className="mb-sm flex w-full flex-row items-center">
//           <View className="mb-md flex w-full flex-1 flex-row items-center rounded-lg bg-ivory px-sm">
//             <SearchIcon width={20} />
//             <PrimaryTextInputControl
//               className="flex-1"
//               placeholder="Search Users"
//               inputMode="text"
//               autoFocus
//               value={searchQuery}
//               onChangeText={onSearchChange}
//             />
//             <Link href="../">Cancel</Link>
//           </View>
//         </View>
//         <FlatList
//           data={data.user?.searchFriends ?? []}
//           renderItem={({ item }) => <UserInviteCard userFragment={item} />}
//         />
//       </View>
//     </View>
//   );
// };
