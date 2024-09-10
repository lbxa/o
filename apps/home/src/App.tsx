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
      <div class="mx-auto flex flex-col px-sm pb-[30vh] sm:max-w-screen-sm md:gap-lg lg:max-w-screen-md lg:flex-row">
        <Mission />
        <div>
          <Why />
          <div class="mb-lg flex gap-lg">
            <Button
              class="rounded-full bg-black p-lg px-xl text-2xl font-bold text-white hover:bg-black/80 md:text-lg"
              onClick={() => {
                setStore("host", (prev) => !prev);
                setStore("user", false);
              }}
            >
              For Hosts
            </Button>
            <Button
              class="rounded-full bg-black p-lg px-xl text-2xl font-bold text-white hover:bg-black/80 md:text-lg"
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
