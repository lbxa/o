import Flame from "@assets/icons/flame.svg";
import Snowflake from "@assets/icons/snowflake.svg";
import classNames from "classnames";
import { View } from "react-native";

import { OText } from "../universe/atoms";
import { useOTheme } from "../utils/useOTheme";

export const UserStreak = ({ streak }: { streak: number }) => {
  const { isDark, colors, builtInColors } = useOTheme();
  const colorMatrix = {
    orange: {
      bg: "bg-orange-200 dark:bg-orange-500",
      text: "text-orange-400 dark:text-ivory",
      fill: isDark ? colors.ivory.DEFAULT : builtInColors.orange[400],
    },
    red: {
      bg: "bg-red-200 dark:bg-red-500",
      text: "text-red-500 dark:text-ivory",
      fill: isDark ? colors.ivory.DEFAULT : builtInColors.red[500],
    },
    indigo: {
      bg: "bg-indigo-200 dark:bg-indigo-500",
      text: "text-indigo-500 dark:text-ivory",
      fill: isDark ? colors.ivory.DEFAULT : colors.indigo.DEFAULT,
    },
    gray: {
      bg: "bg-gray-200 dark:bg-gray-500",
      text: "text-gray-500 dark:text-ivory",
      fill: isDark ? colors.ivory.DEFAULT : builtInColors.gray[500],
    },
  };

  const getStreakColors = (streak: number) => {
    if (streak <= 1) return colorMatrix.gray;
    if (streak < 20) return colorMatrix.orange;
    if (streak < 50) return colorMatrix.red;
    return colorMatrix.indigo;
  };

  const streakColors = getStreakColors(streak);

  return (
    <View
      className={classNames(
        "flex-row items-center gap-xs rounded-full px-sm py-xs",
        streakColors.bg
      )}
    >
      {streak <= 1 && (
        <Snowflake width={16} height={16} fill={streakColors.fill} />
      )}
      {streak > 1 && <Flame width={16} height={16} fill={streakColors.fill} />}
      {streak !== 0 && (
        <OText className={classNames("font-bold", streakColors.text)}>
          {streak}
        </OText>
      )}
    </View>
  );
};
