import type { Component } from "solid-js";
import { For } from "solid-js";

const Tag: Component<{
  direction: "left" | "right";
  tag: string;
  delay?: string;
}> = (props) => {
  return (
    <div class="flex">
      <p
        class={`
          shrink-0 whitespace-nowrap
          bg-gradient-to-r from-white to-white/70
          bg-clip-text text-[5rem] font-bold
          leading-none tracking-tight text-transparent
          ${props.direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        `}
        style={{ "animation-delay": props.delay }}
        aria-hidden="true"
      >
        <For each={Array.from({ length: 10 })}>
          {(_) => <span>{props.tag}&nbsp;</span>}
        </For>
      </p>
      <p
        class={`
          shrink-0 whitespace-nowrap
          bg-gradient-to-r from-white to-white/70
          bg-clip-text text-[5rem] font-bold
          leading-none tracking-tight text-transparent
          ${props.direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        `}
        style={{ "animation-delay": props.delay }}
        aria-hidden="true"
      >
        <For each={Array.from({ length: 10 })}>
          {(_) => <span>{props.tag}&nbsp;</span>}
        </For>
      </p>
    </div>
  );
};

export const Mission: Component = () => {
  return (
    <section class="flex h-dvh items-center justify-center overflow-hidden">
      <div class="relative">
        <div class="hidden sm:block">
          <span class="block origin-bottom text-[clamp(7.5rem,15vw,22rem)] font-bold leading-none tracking-tight">
            <span
              class="relative inline-block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent 
              transition-[transform,background] duration-700 ease-in-out [background-size:200%_auto] 
              hover:scale-105 hover:bg-gradient-to-r hover:from-white 
              hover:to-white/40 hover:[background-position:100%_50%]"
            >
              CONNECTED
            </span>
          </span>
          <span class="block origin-bottom text-[clamp(6.5rem,13vw,20rem)] font-bold leading-none tracking-tight">
            <span
              class="relative inline-block bg-gradient-to-l from-white to-white/70 bg-clip-text text-transparent 
              transition-[transform,background] duration-700 ease-in-out [background-size:200%_auto] 
              hover:scale-105 hover:bg-gradient-to-l hover:from-white
              hover:to-white/40 hover:[background-position:0%_50%]"
            >
              THROUGH
            </span>
            <span class="block origin-bottom text-[clamp(6.5rem,13vw,20rem)] font-bold leading-none tracking-tight">
              <span
                class="relative inline-block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent 
              transition-[transform,background] duration-700 ease-in-out [background-size:200%_auto] 
              hover:scale-105 hover:bg-gradient-to-r hover:from-white 
              hover:to-white/40 hover:[background-position:100%_50%]"
              >
                FITNESS
              </span>
            </span>
          </span>
        </div>

        <div class="flex flex-col gap-8 overflow-hidden sm:hidden">
          <div class="overflow-hidden whitespace-nowrap">
            <Tag direction="left" tag="CONNECTED" />
          </div>
          <div class="overflow-hidden whitespace-nowrap">
            <Tag direction="right" tag="THROUGH" delay="-1s" />
          </div>
          <div class="overflow-hidden whitespace-nowrap">
            <Tag direction="left" tag="FITNESS" delay="-2s" />
          </div>
        </div>
      </div>
    </section>
  );
};
