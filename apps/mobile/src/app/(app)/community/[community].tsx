import { useLocalSearchParams } from "expo-router";

import { CommunityRoot } from "../../../communities";

export default function CommunityDetailsRoute() {
  // const router = useRouter();

  // const [queryRef, loadQuery, disposeQuery] =
  //   useQueryLoader<CommunityChallengesQuery>(COMMUNITY_CHALLENGES_QUERY);

  const { community: communityId } = useLocalSearchParams<{
    community: string;
  }>();

  // const community = useActiveCommunity();

  // const query = useLazyLoadQuery<CommunityDetailsQuery>(
  //   COMMUNITY_DETAILS_QUERY,
  //   { id: community?.id },
  //   { fetchPolicy: "store-and-network" }
  // );

  // useEffect(() => {
  //   loadQuery({ communityId: community?.id });

  //   return () => disposeQuery();
  // }, [community]);

  return <CommunityRoot communityId={communityId} />;
}
