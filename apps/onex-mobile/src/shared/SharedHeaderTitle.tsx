import ChevronLeftIcon from "@assets/icons/chevron-left.svg";
import classNames from "classnames";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { OTouchable } from "@/universe/atoms";

import { useSvgFill } from "../utils";

export const SharedHeaderTitle: React.FC<{
  title: string;
  headerBack?: boolean;
  ellipsize?: boolean;
}> = ({ title, headerBack = true, ellipsize = false }) => {
  const router = useRouter();
  const svgFill = useSvgFill();

  return (
    <View
      className={classNames("gap-sm flex flex-row items-center", {
        "mr-auto": ellipsize,
      })}
    >
      {headerBack && (
        <OTouchable onPress={() => router.back()}>
          <ChevronLeftIcon fill={svgFill} />
        </OTouchable>
      )}
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className={classNames("dark:text-ivory text-3xl font-bold text-black", {
          "w-11/12": ellipsize,
        })}
      >
        {title}
      </Text>
    </View>
  );
};
