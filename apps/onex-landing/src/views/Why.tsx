import { AppStoreSvg, OnexSvg } from "@/icons";
import { Svg } from "@/icons";
import { Highlight } from "@/universe/atoms";

export const Why = () => {
  return (
    <div class="flex flex-col items-center justify-center gap-4xl">
      <Svg
        src={OnexSvg}
        class="w-20 drop-shadow-2xl transition-all duration-700 hover:scale-105 md:w-40"
      />
      <div class="flex flex-col items-center gap-md">
        <p class="text-center font-mono text-2xl text-ivory">
          Unleash <Highlight color="black">your</Highlight> potential.
        </p>
        <p class="text-center font-mono text-2xl text-ivory">
          Surpass limits <Highlight color="black">together</Highlight>.
        </p>
      </div>
      <div class="flex flex-col items-center gap-md">
        <p class="text-center font-mono text-2xl text-ivory">Coming soon</p>
        <Svg src={AppStoreSvg} class="w-40" />
      </div>
    </div>
  );
};
