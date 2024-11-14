import { View } from "react-native";

import { CommunityList } from "@/communities";
import { Ozone } from "@/universe/molecules";

export default function CommunityHomeRoute() {
  // const [communityListQueryRef, loadCommunityList, disposeCommunityList] =
  //   useQueryLoader<CommunityListQuery>(COMMUNITY_LIST_QUERY);

  // useEffect(() => {
  //   loadCommunityList({});

  //   return () => disposeCommunityList();
  // }, []);

  return (
    <Ozone>
      <View>
        <CommunityList />
      </View>
    </Ozone>
  );
}
