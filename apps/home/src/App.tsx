import { Header } from "@universe/molecules";

import { FaQ } from "./views/FaQ/FaQ";
import { Footer } from "./views/Footer";
import { Mission } from "./views/Mission";
import { Pilot } from "./views/Pilot";
import { Waitlist } from "./views/Waitlist";
import { Why } from "./views/Why";

export const App = () => {
  return (
    <div class="w-full selection:bg-black selection:text-white">
      <Header />
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
