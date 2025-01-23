import type { JSX, ParentProps } from "solid-js";

export interface WhyCardProps {
  title: string;
  body: string;
  icon: JSX.Element;
  blurred?: boolean;
}
export const WhyCard = (props: ParentProps<WhyCardProps>): JSX.Element => {
  return (
    <div class="relative mb-md rounded-lg border-2 border-solid border-black bg-ivory-light p-sm shadow-lg">
      <div class="flex gap-2 pb-xs">
        {props.icon}
        <h1 class="text-lg">{props.title}</h1>
      </div>
      <p class="relative">{props.body}</p>
    </div>
  );
};
