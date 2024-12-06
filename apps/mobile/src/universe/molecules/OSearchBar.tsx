import SearchIcon from "@assets/icons/search.svg";
import { useCallback } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { OTouchable, PrimaryTextInputControl } from "../atoms";

interface OSearchBarProps {
  loading?: boolean;
  placeholder?: string;
  searchQuery: string;
  onSearchChange: (term: string) => void;
}

export const OSearchBar = ({
  searchQuery,
  onSearchChange,
  loading,
  placeholder = "Search",
}: OSearchBarProps) => {
  const handleChange = useCallback(
    (term: string) => {
      onSearchChange(term);
    },
    [onSearchChange]
  );

  return (
    <View className="flex w-full flex-row items-center">
      <View className="mb-md flex w-full flex-1 flex-row items-center rounded-lg bg-ivory px-sm">
        {loading ? <ActivityIndicator /> : <SearchIcon width={20} />}
        <PrimaryTextInputControl
          className="flex-1"
          placeholder={placeholder}
          inputMode="text"
          autoFocus
          value={searchQuery}
          textContentType="oneTimeCode"
          onChangeText={handleChange}
        />
        <OTouchable onPress={() => onSearchChange("")}>
          <Text>Clear</Text>
        </OTouchable>
      </View>
    </View>
  );
};
