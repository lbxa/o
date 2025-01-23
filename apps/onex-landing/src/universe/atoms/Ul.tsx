import type { JSX, ParentProps } from "solid-js";

interface Props {
  class?: string;
}

export const Ul = (props: ParentProps<Props>): JSX.Element => {
  return <ul class={`list-disc pl-lg ${props.class}`}>{props.children}</ul>;
};
