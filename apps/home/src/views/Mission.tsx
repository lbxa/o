import { Highlight } from "@universe/atoms";

export const Mission = () => {
  return (
    <div class="mb-xl text-3xl">
      <p class="mb-md whitespace-normal break-words">
        We're reshaping the fitness industry by harnessing the power of{" "}
        <Highlight color="black">community...</Highlight>
      </p>
      <p class="mb-md">
        and
        <strong class="mx-2 font-black text-black underline">algorithms</strong>
      </p>
      <p>
        to keep users <Highlight color="black">connected</Highlight> and held
        <strong class="mx-2 font-black text-black underline">
          accountable
        </strong>
        to their fitness journey.
      </p>
    </div>
  );
};
