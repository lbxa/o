import { Button } from "@universe/atoms";
import { Header } from "@universe/molecules";
import { createStore } from "solid-js/store";

import { FaQ } from "./views/FaQ/FaQ";
import { Footer } from "./views/Footer";
import { Mission } from "./views/Mission";
import { Pilot } from "./views/Pilot";
import { Waitlist } from "./views/Waitlist";
import { Why } from "./views/Why";

interface AppStore {
  host: boolean;
  user: boolean;
}

export const App = () => {
  const [store, setStore] = createStore<AppStore>({ host: false, user: false });

  return (
    <div class="w-full selection:bg-black selection:text-white">
      <Header />
      <div class="px-sm md:gap-lg mx-auto flex flex-col pb-[30vh] sm:max-w-screen-sm lg:max-w-screen-md lg:flex-row lg:pt-[120px]">
        <Mission />
        <div>
          <Why />
          <div class="mb-lg gap-lg flex w-fit">
            <Button
              class="p-lg rounded-full bg-black text-2xl font-bold text-white hover:bg-black/80"
              onClick={() => {
                setStore("host", (prev) => !prev);
                setStore("user", false);
              }}
            >
              For Hosts
            </Button>
            <Button
              class="p-lg rounded-full bg-black text-2xl font-bold text-white hover:bg-black/80"
              onClick={() => {
                setStore("user", (prev) => !prev);
                setStore("host", false);
              }}
            >
              For Users
            </Button>
          </div>
          {store.host && <Pilot />}
          {store.user && <Waitlist />}
          <FaQ />
        </div>
      </div>
      <Footer />
    </div>
  );
};
