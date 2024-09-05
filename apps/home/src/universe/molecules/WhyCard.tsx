import type { JSX, ParentProps } from "solid-js";
import { createMemo, createSignal } from "solid-js";

export const Callout = (): JSX.Element => {
  return (
    <blockquote
      class="absolute left-0 top-0 mb-md grid size-full text-center text-3xl"
      // classList={{ "opacity-0": !active(), "opacity-100": active() }}
    >
      <div class="m-auto rounded-lg bg-black/80 p-sm font-black text-white">
        <p>Don't be the only gym</p>
        <p>
          <i class="underline">without</i> it.
        </p>
      </div>
    </blockquote>
  );
};

export interface WhyCardProps {
  title: string;
  body: string;
  icon: JSX.Element;
  blurred?: boolean;
}
export const WhyCard = (props: ParentProps<WhyCardProps>): JSX.Element => {
  const [active, setActive] = createSignal(props.blurred);

  const activeClass = createMemo(() => ({
    "blur-sm": active(),
  }));

  return (
    <div
      onClick={() => setActive((prev) => !prev)}
      class="relative mb-md rounded-lg border-2 border-solid border-black bg-gray-100 p-sm shadow-lg"
    >
      <div class="flex gap-2 pb-xs">
        {props.icon}
        <h1 class="text-lg">{props.title}</h1>
      </div>
      <p class="relative" classList={activeClass()}>
        {props.body}
      </p>
      {/* {active() && <Callout />} */}
    </div>
  );
};
