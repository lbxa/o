import { Highlight } from "@universe/atoms";

export const Mission = () => {
  return (
    <div class="mb-xl text-3xl">
      <p class="mb-md whitespace-normal break-words">
        We're reshaping the fitness industry by harnessing the power of{" "}
        <Highlight color="navy">community...</Highlight>
      </p>
      <p class="mb-md">
        and
        <strong class="mx-2 font-black text-navy underline">algorithms</strong>
      </p>
      <p>
        to keep users <Highlight color="navy">connected</Highlight> and held
        <strong class="mx-2 font-black text-navy underline">accountable</strong>
        to their fitness journey.
      </p>
    </div>
  );
};
