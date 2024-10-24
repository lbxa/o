import CrossIcon from "@assets/icons/cross.svg";
import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import { Pill, Touchable } from "../atoms";

interface PillGroupProps {
  group: {
    label: string;
    options: string[];
  }[];
  onOptionPress?: (option: string) => void;
  onGroupPress?: (group: string) => void;
  groupSelected?: string;
  optionSelected?: string;
}

export const PillGroup = ({
  group,
  onGroupPress,
  onOptionPress,
  groupSelected,
  optionSelected,
}: PillGroupProps) => {
  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined);
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollTo({
          y: 0,
          x: 0,
          animated: true,
        });
      }}
    >
      <View className="flex flex-row">
        {group.map(({ label, options }, i) => (
          <View key={i} className="flex flex-row items-center">
            {openIndex === i && (
              <Touchable
                className="mr-md rounded-full bg-gray-200 p-xs"
                onPress={() => setOpenIndex(undefined)}
              >
                <CrossIcon width={18} height={18} fill={"gray"} />
              </Touchable>
            )}
            {(openIndex === i || openIndex === undefined) && (
              <Pill
                label={label}
                className="mr-md"
                onPress={() => {
                  setOpenIndex(openIndex === i ? undefined : i);
                  onGroupPress?.(label);
                }}
                selected={groupSelected === label}
              />
            )}
            {openIndex === i && (
              <View className="flex flex-row gap-md">
                {options.map((option, j) => (
                  <Pill
                    key={j}
                    label={option}
                    variant="navy"
                    selected={optionSelected === option}
                    onPress={() => onOptionPress?.(option)}
                  />
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
