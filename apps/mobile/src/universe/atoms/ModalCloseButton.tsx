import CrossIcon from "@assets/icons/cross.svg";
import { useRouter } from "expo-router";

import { OTouchable } from "./OTouchable";

export const ModalCloseButton = () => {
  const router = useRouter();
  return (
    <OTouchable
      onPress={() => router.back()}
      className="rounded-full bg-ivory p-xs"
    >
      <CrossIcon width={20} height={20} />
    </OTouchable>
  );
};
