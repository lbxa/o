import MenuIcon from "@assets/icons/menu.svg";
import MessageIcon from "@assets/icons/message.svg";
import PlusIcon from "@assets/icons/plus.svg";
import SearchIcon from "@assets/icons/search.svg";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import React from "react";
import { useColorScheme, View } from "react-native";

import { OTouchable } from "../atoms";

const ICON_DIM = {
  width: 20,
  height: 20,
} as const;

interface MiniNavItemProps {
  href: Href;
}

const MiniNavItem: React.FC<PropsWithChildren & MiniNavItemProps> = ({
  children,
  href,
}) => {
  const router = useRouter();
  return (
    <OTouchable
      onPress={() => router.push(href)}
      className="bg-ivory p-xs rounded-full dark:bg-white/20"
    >
      <View>{children}</View>
    </OTouchable>
  );
};

type NavItemType = "create" | "search" | "message" | "manage";

const DEFAULT_PATHS: Record<NavItemType, Href> = {
  create: "/(root)/community/create",
  search: "/(root)/community/search",
  message: "/(root)/home/message",
  manage: "/(root)/community/manage",
};

interface NavItemConfig {
  href?: Href;
}

interface MiniNavProps {
  items?: NavItemType[] | "all";
  itemConfigs?: Partial<Record<NavItemType, NavItemConfig>>;
}

export const MiniNav: React.FC<MiniNavProps> = ({
  items = "all",
  itemConfigs = {},
}) => {
  const colorScheme = useColorScheme();
  const iconFill = colorScheme === "dark" ? "#edf4f8" : "#000000";
  const NavIcons: Record<NavItemType, React.ReactElement> = {
    create: <PlusIcon {...ICON_DIM} fill={iconFill} />,
    search: <SearchIcon {...ICON_DIM} fill={iconFill} />,
    message: <MessageIcon {...ICON_DIM} fill={iconFill} />,
    manage: <MenuIcon {...ICON_DIM} fill={iconFill} />,
  };

  const itemsToRender =
    items === "all" ? (Object.keys(NavIcons) as NavItemType[]) : items;

  return (
    <View className="gap-md flex flex-row items-center">
      {itemsToRender.map((item) => {
        const href = itemConfigs[item]?.href ?? DEFAULT_PATHS[item];
        return (
          <MiniNavItem key={item} href={href}>
            {NavIcons[item]}
          </MiniNavItem>
        );
      })}
    </View>
  );
};
