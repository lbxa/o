import { useMemo } from "react";

import { useZustStore } from "@/state";

export const useSelectedCommunity = () => {
  const { selectedCommunity } = useZustStore();
  return useMemo(() => selectedCommunity, [selectedCommunity]);
};
