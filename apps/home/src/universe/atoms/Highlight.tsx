import type { ParentProps } from "solid-js";
import { createMemo } from "solid-js";

interface Props {
  color: "black" | "red";
}
export const Highlight = (props: ParentProps<Props>) => {
  const classes = createMemo(() => ({
    "bg-black text-white": props.color === "black",
    "bg-red-500 text-white": props.color === "red",
  }));

  return (
    <span class="px-1" classList={classes()}>
      <span class="font-black">{props.children}</span>
    </span>
  );
};
