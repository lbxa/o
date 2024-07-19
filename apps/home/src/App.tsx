import { ArtTitle } from "@universe/molecules";

import { FaQ } from "./views/FaQ/FaQ";
import { Footer } from "./views/Footer";
import { Mission } from "./views/Mission";
import { Pilot } from "./views/Pilot";
import { Waitlist } from "./views/Waitlist";
import { Why } from "./views/Why";

export const App = () => {
  return (
    <div class="w-full selection:bg-black selection:text-white">
      <div class="mx-auto mb-xl flex w-full flex-col justify-around rounded-b-3xl bg-black py-sm pl-sm text-white lg:rounded-none lg:pl-0 lg:text-center">
        <h1 class="text-6xl font-black md:text-7xl">Welcome to</h1>
        <ArtTitle />
      </div>
      <div class="mx-auto flex flex-col px-sm pb-[30vh] sm:max-w-screen-sm md:flex-row md:gap-lg lg:max-w-screen-md">
        <Mission />
        <div>
          <Why />
          <Pilot />
          <FaQ />
          <Waitlist />
        </div>
      </div>
      <Footer />
    </div>
  );
};
