import { Li, Title, Ul } from "@universe/atoms";
import { createSignal, For } from "solid-js";

export const Why = () => {
  const [active, setActive] = createSignal<boolean>(false);

  const items: string[] = [
    "Customisable challenges: We provide the tools to tailor fitness challenges catering to your community's unique needs.",
    "Highly interactive: Seamless interactions between members and staff in and outside of the gym through our social channels.",
    "Data data data: Utilise our analytic tools to gain valuable insights into member preferences and behaviours, enhancing gym management and member satisfaction.",
    "Gamification: Immersive challenges, goal milestones, dynamic progress checking and rewarding achievements.",
    "Community: A supportive environment where members connect and progress together!",
    "Speed: oNex is just getting started. New features are rolling out every week.",
  ];

  return (
    <div class="mb-lg">
      <Title>Why oNex?</Title>
      <div class="relative" onClick={() => setActive((prev) => !prev)}>
        {active() && (
          <blockquote
            // eslint-disable-next-line tailwindcss/enforces-shorthand
            class="absolute left-0 top-0 mb-md grid h-full w-full text-center text-3xl"
            classList={{ "opacity-0": !active(), "opacity-100": active() }}
          >
            <div class="m-auto rounded-lg bg-black/100 p-sm font-black text-white">
              <p>Don't be the only gym</p>
              <p>
                <i class="underline">without</i> it.
              </p>
            </div>
          </blockquote>
        )}
        <Ul class="px-3">
          <For each={items}>{(item) => <Li strike={active()}>{item}</Li>}</For>
        </Ul>
      </div>
    </div>
  );
};
