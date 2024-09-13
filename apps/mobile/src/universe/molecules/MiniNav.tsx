import * as Haptics from "expo-haptics";
import type { Href } from "expo-router";
import { Link } from "expo-router";
import type { PropsWithChildren } from "react";
import { TouchableOpacity, View } from "react-native";

import MessageIcon from "../../../assets/icons/message.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import SearchIcon from "../../../assets/icons/search.svg";

const ICON_DIM = {
  width: 20,
  height: 20,
} as const;

interface MiniNavItemProps {
  href: Href<string>;
}

const MiniNavItem: React.FC<PropsWithChildren & MiniNavItemProps> = ({
  children,
  href,
}) => {
  const onPressHandler = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  return (
    <Link href={href} onPress={onPressHandler} asChild>
      <TouchableOpacity className="rounded-full bg-ivory p-xs">
        <View>{children}</View>
      </TouchableOpacity>
    </Link>
  );
};

export const MiniNav: React.FC = () => {
  return (
    <View className="flex flex-row items-center gap-md">
      <MiniNavItem href="/(app)/community/create">
        <PlusIcon {...ICON_DIM} />
      </MiniNavItem>
      <MiniNavItem href="/(app)/community/search">
        <SearchIcon {...ICON_DIM} />
      </MiniNavItem>
      <MiniNavItem href="/">
        <MessageIcon {...ICON_DIM} />
      </MiniNavItem>
    </View>
  );
};
