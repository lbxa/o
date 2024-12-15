import CrossIcon from "@assets/icons/cross.svg";
import SearchIcon from "@assets/icons/search.svg";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { useSvgFill } from "../../utils";
import { OTouchable, PrimaryTextInputControl } from "../atoms";

interface OSearchBarProps {
  loading?: boolean;
  placeholder?: string;
  searchQuery: string;
  onSearchChange: (term: string) => void;
  showCancel?: boolean;
}

export const OSearchBar = ({
  searchQuery,
  onSearchChange,
  loading,
  showCancel = true,
  placeholder = "Search",
}: OSearchBarProps) => {
  const svgFill = useSvgFill();
  const router = useRouter();
  const handleChange = useCallback(
    (term: string) => {
      onSearchChange(term);
    },
    [onSearchChange]
  );

  return (
    <View className="mb-md gap-sm flex w-full flex-row items-center">
      <View className="bg-ivory px-sm flex flex-1 flex-row items-center rounded-lg dark:bg-neutral-800">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <SearchIcon width={20} fill={svgFill} />
        )}
        <PrimaryTextInputControl
          className="flex-1"
          placeholder={placeholder}
          inputMode="text"
          autoFocus
          value={searchQuery}
          textContentType="oneTimeCode"
          returnKeyType="search"
          onChangeText={handleChange}
        />
        <OTouchable onPress={() => onSearchChange("")}>
          <CrossIcon width={18} height={18} fill={svgFill} />
        </OTouchable>
      </View>
      {showCancel && (
        <OTouchable onPress={() => router.back()}>
          <Text className="dark:text-ivory text-black">Cancel</Text>
        </OTouchable>
      )}
    </View>
  );
};
