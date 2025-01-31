import type { JSX, ParentProps } from "solid-js";

export const Title = (props: ParentProps): JSX.Element => {
  return (
    <h1 class="mb-md text-4xl font-black text-ivory md:text-5xl">
      {props.children}
    </h1>
  );
};
