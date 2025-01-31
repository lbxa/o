import { createStore } from "solid-js/store";

import { Button } from "@/universe/atoms";
import { Pilot } from "@/views/Pilot";
import { Waitlist } from "@/views/Waitlist";

interface PilotStore {
  host: boolean;
  user: boolean;
  faq: boolean;
}

export const Switch = () => {
  const [store, setStore] = createStore<PilotStore>({
    host: false,
    user: false,
    faq: false,
  });
  return (
    <div>
      <div class="mx-auto mb-lg flex w-fit gap-lg">
        <Button
          class={`rounded-full bg-black p-lg text-2xl font-bold text-ivory hover:bg-black/80 ${store.host ? "ring-2 ring-ivory" : ""}`}
          onClick={() => {
            setStore("host", (prev) => !prev);
            setStore("user", false);
          }}
        >
          For Hosts
        </Button>
        <Button
          class={`rounded-full bg-black p-lg text-2xl font-bold text-ivory hover:bg-black/80 ${store.user ? "ring-2 ring-ivory" : ""}`}
          onClick={() => {
            setStore("user", (prev) => !prev);
            setStore("host", false);
          }}
        >
          For Users
        </Button>
        {/* <Button
          class={`rounded-full bg-black p-lg text-2xl font-bold text-ivory hover:bg-black/80 ${store.user ? "ring-2 ring-ivory" : ""}`}
          onClick={() => {
            setStore("user", (prev) => !prev);
            setStore("host", false);
          }}
        >
          FaQ
        </Button> */}
      </div>
      <div class="mx-auto max-w-screen-sm px-lg">
        {store.host && <Pilot />}
        {store.user && <Waitlist />}
      </div>
    </div>
  );
};
