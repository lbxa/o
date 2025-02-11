import { Highlight } from "@universe/atoms";

export const Beta = () => {
  return (
    <div class="mb-xl">
      <p class="mb-md text-3xl">
        Keen to <Highlight color="black">level up</Highlight> your fitness
        journey alongside our friends?
      </p>
      <p class="mb-md">
        Join our beta and you can get early access to the platform!
      </p>

      <a
        href="https://testflight.apple.com/join/aAR7CVge"
        target="_blank"
        class="block w-full rounded-xl bg-black p-sm px-md text-center font-bold text-white"
      >
        JOIN THE BETA
      </a>
    </div>
  );
};
