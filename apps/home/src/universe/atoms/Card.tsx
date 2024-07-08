import type { JSX, ParentProps } from "solid-js";

export const Card: (props: ParentProps) => JSX.Element = (props) => {
  return (
    <div class="m-auto w-full bg-black text-white	opacity-80 backdrop-blur-3xl">
      {props.children}
    </div>
  );
};
