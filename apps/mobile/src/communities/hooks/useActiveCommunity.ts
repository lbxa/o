import { useMemo } from "react";

import { selectActiveCommunity, useAppSelector } from "@/state";

export const useActiveCommunity = () => {
  const activeCommunity = useAppSelector(selectActiveCommunity);
  return useMemo(() => activeCommunity, [activeCommunity]);
};
