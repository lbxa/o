import type { JSX, ParentProps } from "solid-js";

export const Title = (props: ParentProps): JSX.Element => {
  return (
    <h1 class="mb-md text-6xl font-black md:text-7xl">{props.children}</h1>
  );
};
