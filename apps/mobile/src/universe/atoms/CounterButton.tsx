import classNames from "classnames";
import { Text } from "react-native";

import { Touchable } from "./Touchable";

export type CounterButtonVariant = "count" | "done";

export interface CounterButtonProps {
  variant: CounterButtonVariant;
  setVariant: React.Dispatch<React.SetStateAction<CounterButtonVariant>>;
  onCount: () => void;
  onDone: () => void;
  reset?: boolean;
}

export const CounterButton = ({
  variant,
  setVariant,
  onCount,
  onDone,
}: CounterButtonProps) => {
  const handlerLookup: Record<CounterButtonVariant, () => void> = {
    count: onCount,
    done: onDone,
  };

  const labelLookup: Record<CounterButtonVariant, string> = {
    count: "Count",
    done: "Done",
  };

  const stateLookup: Record<CounterButtonVariant, CounterButtonVariant> = {
    count: "done",
    done: "count",
  };

  const selectVariantText = (variant: CounterButtonVariant) =>
    labelLookup[variant];

  const handlePress = () => {
    setVariant((prev) => stateLookup[prev]);
    handlerLookup[variant]();
  };

  return (
    <Touchable
      onPress={handlePress}
      className={classNames("mt-auto flex size-[250px] rounded-full ", {
        "bg-green-200": variant === "count",
        "bg-indigo-200": variant === "done",
      })}
    >
      <Text
        className={classNames("m-auto text-3xl font-bold", {
          "text-green-600": variant === "count",
          "text-indigo-600": variant === "done",
        })}
      >
        {selectVariantText(variant)}
      </Text>
    </Touchable>
  );
};
