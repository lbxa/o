import BellIcon from "@assets/icons/bell.svg";
import MenuIcon from "@assets/icons/menu.svg";
import MessageIcon from "@assets/icons/message.svg";
import PlusIcon from "@assets/icons/plus.svg";
import SearchIcon from "@assets/icons/search.svg";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import React from "react";
import { useColorScheme, View } from "react-native";

import { useHasNotifications } from "@/users";

import { OTouchable } from "../atoms";

const ICON_DIM = {
  width: 22,
  height: 22,
} as const;

interface MiniNavItemProps {
  href: Href;
  hasNotifications?: boolean;
}

const MiniNavItem: React.FC<PropsWithChildren & MiniNavItemProps> = ({
  children,
  hasNotifications,
  href,
}) => {
  const router = useRouter();
  return (
    <OTouchable
      onPress={() => router.push(href)}
      className="relative rounded-full p-xs"
    >
      <View>{children}</View>
      {hasNotifications && (
        <View className="absolute right-px top-px size-3 rounded-full border border-white bg-indigo-500 dark:border-black" />
      )}
    </OTouchable>
  );
};

type NavItemType = "create" | "search" | "message" | "manage" | "notifications";

const DEFAULT_PATHS: Record<NavItemType, Href> = {
  create: "/(root)/community/community-create",
  search: "/(root)/community/search",
  message: "/(root)/home/message",
  manage: "/(root)/community/community-manage",
  notifications: "/(root)/home/notifications",
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
  const hasNotifications = useHasNotifications();
  const iconFill = colorScheme === "dark" ? "#edf4f8" : "#000000";
  const NavIcons: Record<
    NavItemType,
    { icon: React.ReactElement; hasNotifications?: boolean }
  > = {
    create: {
      icon: <PlusIcon {...ICON_DIM} fill={iconFill} />,
      hasNotifications: false,
    },
    search: {
      icon: <SearchIcon {...ICON_DIM} fill={iconFill} />,
      hasNotifications: false,
    },
    message: {
      icon: <MessageIcon {...ICON_DIM} fill={iconFill} />,
      hasNotifications: false,
    },
    manage: {
      icon: <MenuIcon {...ICON_DIM} fill={iconFill} />,
      hasNotifications: false,
    },
    notifications: {
      icon: <BellIcon {...ICON_DIM} fill={iconFill} />,
      hasNotifications,
    },
  };

  const itemsToRender =
    items === "all" ? (Object.keys(NavIcons) as NavItemType[]) : items;

  return (
    <View className="flex flex-row items-center gap-md">
      {itemsToRender.map((item) => {
        const href = itemConfigs[item]?.href ?? DEFAULT_PATHS[item];
        return (
          <MiniNavItem
            key={item}
            href={href}
            hasNotifications={NavIcons[item].hasNotifications}
          >
            {NavIcons[item].icon}
          </MiniNavItem>
        );
      })}
    </View>
  );
};
