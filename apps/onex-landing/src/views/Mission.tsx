import type { Component } from "solid-js";

export const Mission: Component = () => {
  return (
    <section class="flex h-dvh items-center justify-center overflow-hidden">
      <div class="relative">
        <div class="hidden sm:block">
          <span class="block origin-bottom text-[clamp(7.5rem,15vw,22rem)] font-bold leading-none tracking-tight">
            <span class="relative inline-block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent transition-all duration-700 hover:scale-105 hover:from-white hover:to-white/40">
              DOPAMINE
            </span>
          </span>
          <span class="block origin-bottom text-[clamp(6.5rem,13vw,20rem)] font-bold leading-none tracking-tight">
            <span class="relative inline-block bg-gradient-to-l from-white to-white/70 bg-clip-text text-transparent transition-all duration-700 hover:scale-105 hover:from-white hover:to-white/40">
              GATEWAY
            </span>
          </span>
        </div>

        <div class="-translate-y-8 sm:hidden">
          <span class="block origin-bottom -rotate-90 bg-gradient-to-r from-white to-white/70 bg-clip-text text-[7.0rem] font-bold leading-none tracking-tight text-transparent">
            DOPAMINE
          </span>
          <span class="block origin-bottom rotate-90 bg-gradient-to-l from-white to-white/70 bg-clip-text text-[7.0rem] font-bold leading-none tracking-tight text-transparent">
            GATEWAY
          </span>
        </div>
      </div>
    </section>
  );
};
