import type { JSX, ParentProps } from "solid-js";
import { createMemo } from "solid-js";

interface Props {
  strike?: boolean;
}

export const Li = (props: ParentProps<Props>): JSX.Element => {
  const strikeClass = createMemo(() => ({
    "line-through text-gray-400": props.strike,
  }));
  return (
    <li class="text-lg text-gray-800" classList={strikeClass()}>
      {props.children}
    </li>
  );
};
