import type { JSX } from "solid-js";
import { createSignal, Index } from "solid-js";

import { MinusSvg, PlusSvg, Svg } from "../../icons";

export interface AccordionItem {
  title: string;
  body: string | JSX.Element;
  active?: boolean;
  onClick?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const AccordionItem = (props: AccordionItem) => {
  return (
    <div class="border-b-2 border-black last:border-none">
      <div
        class="flex cursor-pointer bg-gray-100 p-sm  hover:bg-gray-200"
        classList={{
          "rounded-t-lg": props.isFirst,
          "rounded-b-lg": props.isLast && !props.active,
        }}
        onClick={props.onClick}
      >
        <h1 class="grow">{props.title}</h1>
        {props.active ? (
          <Svg src={MinusSvg} class="w-md" />
        ) : (
          <Svg src={PlusSvg} class="w-md" />
        )}
      </div>
      {props.active && (
        <div class="border-t-2 border-t-black p-sm">{props.body}</div>
      )}
    </div>
  );
};

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion = (props: AccordionProps) => {
  const [activeIndex, setActiveIndex] = createSignal<number | undefined>(
    undefined
  );

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex() === index ? undefined : index);
  };

  return (
    <div class="rounded-lg border-2 border-black">
      <Index each={props.items}>
        {(item, i) => (
          <AccordionItem
            title={item().title}
            body={item().body}
            active={activeIndex() === i}
            onClick={() => handleClick(i)}
            isFirst={i == 0}
            isLast={i === props.items.length - 1}
          />
        )}
      </Index>
    </div>
  );
};
