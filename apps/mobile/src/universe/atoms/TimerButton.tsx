import classNames from "classnames";
import { Text } from "react-native";

import { OTouchable } from "./OTouchable";

export type TimerButtonVariant = "start" | "stop" | "done";

export interface TimerButtonProps {
  variant: TimerButtonVariant;
  setVariant: React.Dispatch<React.SetStateAction<TimerButtonVariant>>;
  onStart: () => void;
  onStop: () => void;
  onDone: () => void;
  reset?: boolean;
}

export const TimerButton = ({
  variant,
  setVariant,
  onStart,
  onStop,
  onDone,
}: TimerButtonProps) => {
  const handlerLookup: Record<TimerButtonVariant, () => void> = {
    start: onStart,
    stop: onStop,
    done: onDone,
  };

  const labelLookup: Record<TimerButtonVariant, string> = {
    start: "Start",
    stop: "Stop",
    done: "Done",
  };

  const stateLookup: Record<TimerButtonVariant, TimerButtonVariant> = {
    start: "stop",
    stop: "done",
    done: "start",
  };

  const selectVariantText = (variant: TimerButtonVariant) =>
    labelLookup[variant];

  const handlePress = () => {
    setVariant((prev) => stateLookup[prev]);
    handlerLookup[variant]();
  };

  return (
    <OTouchable
      onPress={handlePress}
      className={classNames("mt-auto flex size-[250px] rounded-full ", {
        "bg-green-200 dark:bg-green-200/30": variant === "start",
        "bg-red-200 dark:bg-red-200/30": variant === "stop",
        "bg-indigo-200 dark:bg-indigo-200/30": variant === "done",
      })}
    >
      <Text
        className={classNames("m-auto text-3xl font-bold", {
          "text-green-600 dark:text-green-300": variant === "start",
          "text-red-600 dark:text-red-300": variant === "stop",
          "text-indigo-600 dark:text-indigo-300": variant === "done",
        })}
      >
        {selectVariantText(variant)}
      </Text>
    </OTouchable>
  );
};
