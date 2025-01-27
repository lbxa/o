import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { OText } from "@/universe/atoms";
import type { TextSize } from "@/universe/atoms/atom.types";
dayjs.extend(relativeTime);
dayjs.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%dy",
  },
});

export const Timestamp = ({
  timestamp,
  size = "md",
}: {
  timestamp: Date;
  size?: TextSize;
}) => {
  return (
    <OText size={size} gray>
      {dayjs(timestamp).fromNow(true)}
    </OText>
  );
};
