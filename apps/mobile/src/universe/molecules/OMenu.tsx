import { useRouter } from "expo-router";
import { View } from "react-native";

import { OText, OTouchable } from "../atoms";

export interface OMenuItemProps {
  label: string;
  value?: string;
  route?: string;
  onPress?: () => void;
}

export function OMenuItem({ label, value, route, onPress }: OMenuItemProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (route) {
      router.push(route);
    }
  };

  return (
    <OTouchable
      onPress={handlePress}
      className="flex-row items-center justify-between border-b border-gray-200 py-sm dark:border-gray-700"
    >
      <OText className="w-3/12 text-gray-500">{label}</OText>
      {value && (
        <OText
          numberOfLines={1}
          ellipsizeMode="tail"
          className="w-9/12 text-right"
        >
          {value}
        </OText>
      )}
    </OTouchable>
  );
}

export interface OMenuProps {
  items: OMenuItemProps[];
  className?: string;
}

export function OMenu({ items, className = "" }: OMenuProps) {
  return (
    <View className={`flex flex-col gap-sm ${className}`}>
      {items.map((item, index) => (
        <OMenuItem key={`${item.label}-${index}`} {...item} />
      ))}
    </View>
  );
}
