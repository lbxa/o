import type { JSX, ParentProps } from "solid-js";

export const Title = (props: ParentProps): JSX.Element => {
  return (
    <h1 class="mb-md text-ivory text-4xl font-black md:text-5xl">
      {props.children}
    </h1>
  );
};
