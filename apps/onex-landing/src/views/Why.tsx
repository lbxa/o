import { AppStoreSvg, OnexSvg } from "@/icons";
import { Svg } from "@/icons";
import { Highlight } from "@/universe/atoms";

export const Why = () => {
  return (
    <div class="flex flex-col items-center justify-center gap-lg">
      <Svg
        src={OnexSvg}
        class="w-20 drop-shadow-2xl transition-all duration-700 hover:scale-105 md:w-40"
      />
      <Svg src={AppStoreSvg} class="w-40 md:w-60" />
      <p class="text-center font-mono text-2xl text-ivory">
        The <Highlight color="black">gateway</Highlight> drug into your best
        self
      </p>
    </div>
  );
};
