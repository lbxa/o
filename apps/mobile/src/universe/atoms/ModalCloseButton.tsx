import CrossIcon from "@assets/icons/cross.svg";
import { useRouter } from "expo-router";

import { useSvgFill } from "../../utils";
import { OTouchable } from "./OTouchable";

export const ModalCloseButton = () => {
  const router = useRouter();
  const svgFill = useSvgFill();
  return (
    <OTouchable
      onPress={() => router.back()}
      className="bg-ivory p-xs rounded-full dark:bg-white/20"
    >
      <CrossIcon width={20} height={20} fill={svgFill} />
    </OTouchable>
  );
};
