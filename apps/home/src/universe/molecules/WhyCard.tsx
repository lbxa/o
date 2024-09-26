import type { JSX, ParentProps } from "solid-js";

export interface WhyCardProps {
  title: string;
  body: string;
  icon: JSX.Element;
  blurred?: boolean;
}
export const WhyCard = (props: ParentProps<WhyCardProps>): JSX.Element => {
  return (
    <div class="mb-md bg-ivory-light p-sm relative rounded-lg border-2 border-solid border-black shadow-lg">
      <div class="pb-xs flex gap-2">
        {props.icon}
        <h1 class="text-lg">{props.title}</h1>
      </div>
      <p class="relative">{props.body}</p>
    </div>
  );
};
