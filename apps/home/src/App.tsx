import { Join } from "./views/Join";
import { Why } from "./views/Why";

export const App = () => {
  const date = new Date();

  return (
    <div class="w-full">
      <div class="mx-auto mb-lg flex w-full flex-col justify-around rounded-b-3xl bg-black py-3 text-white">
        <h1 class="pl-3 text-6xl font-black md:text-7xl">Welcome to</h1>
        <h1 class="inline bg-picasso bg-contain bg-clip-text bg-center pl-3 text-6xl font-black text-transparent md:text-7xl">
          oNex
        </h1>
      </div>
      <div class="mx-auto flex flex-col px-3 pb-[30vh] md:flex-row md:gap-lg lg:px-[10vw] xl:px-[20vw]">
        <div class="mb-lg text-3xl">
          <p class="whitespace-normal break-words">
            We're reshaping the fitness industry by harnessing the power of
            <span class="mx-2 bg-black px-1">
              <span class="font-black text-white">community...</span>
            </span>
          </p>
          <p>
            and
            <span class="mx-2 font-black text-black">algorithms</span>
            to keep users
            <span class="mx-2 bg-black px-1">
              <span class="font-black text-white">connected</span>
            </span>
            and held
            <span class="mx-2 font-black text-black">accountable</span>
            to their fitness journey.
          </p>
        </div>
        <div>
          <Why />
          <Join />
        </div>
      </div>
      <div class="pb-md text-center">
        <span>oNex {date.getFullYear()}</span>
      </div>
    </div>
  );
};
