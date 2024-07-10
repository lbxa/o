import { FaQ } from "./views/FaQ/FaQ";
import { Join } from "./views/Join";
import { Mission } from "./views/Mission";
import { Why } from "./views/Why";

export const App = () => {
  const date = new Date();

  return (
    <div class="w-full selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <div class="mx-auto mb-xl flex w-full flex-col justify-around rounded-b-3xl bg-black py-3 text-white lg:text-center">
        <h1 class="pl-3 text-6xl font-black md:text-7xl">Welcome to</h1>
        <h1 class="inline bg-picasso bg-contain bg-clip-text bg-center pl-3 text-6xl font-black text-transparent md:text-7xl">
          oNex
        </h1>
      </div>
      <div class="mx-auto flex flex-col px-3 pb-[30vh] md:flex-row md:gap-lg lg:px-[10vw] xl:px-[20vw]">
        <Mission />
        <div>
          <Why />
          <Join />
          <FaQ />
        </div>
      </div>
      <div class="pb-md text-center">
        <span>oNex {date.getFullYear()}</span>
      </div>
    </div>
  );
};
