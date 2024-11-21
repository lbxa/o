import MessageIcon from "@assets/icons/message.svg";
import PlusIcon from "@assets/icons/plus.svg";
import SearchIcon from "@assets/icons/search.svg";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import React from "react";
import { View } from "react-native";

import { OTouchable } from "../atoms";

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
  const router = useRouter();
  return (
    <OTouchable
      onPress={() => router.push(href)}
      className="rounded-full bg-ivory p-xs"
    >
      <View>{children}</View>
    </OTouchable>
  );
};

type NavItemType = "create" | "search" | "message";

const DEFAULT_PATHS: Record<NavItemType, Href<string>> = {
  create: "/(app)/community/create",
  search: "/(app)/community/search",
  message: "/(app)/home/message",
};

const NAV_ICONS: Record<NavItemType, React.ReactElement> = {
  create: <PlusIcon {...ICON_DIM} />,
  search: <SearchIcon {...ICON_DIM} />,
  message: <MessageIcon {...ICON_DIM} />,
};

interface NavItemConfig {
  href?: Href<string>;
}

interface MiniNavProps {
  items?: NavItemType[] | "all";
  itemConfigs?: Partial<Record<NavItemType, NavItemConfig>>;
}

export const MiniNav: React.FC<MiniNavProps> = ({
  items = "all",
  itemConfigs = {},
}) => {
  const itemsToRender =
    items === "all" ? (Object.keys(NAV_ICONS) as NavItemType[]) : items;

  return (
    <View className="flex flex-row items-center gap-md">
      {itemsToRender.map((item) => {
        const href = itemConfigs[item]?.href ?? DEFAULT_PATHS[item];
        return (
          <MiniNavItem key={item} href={href}>
            {NAV_ICONS[item]}
          </MiniNavItem>
        );
      })}
    </View>
  );
};
