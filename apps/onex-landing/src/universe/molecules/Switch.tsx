import { createStore } from "solid-js/store";

import { Button } from "@/universe/atoms";
import { Pilot } from "@/views/Pilot";
import { Waitlist } from "@/views/Waitlist";

interface PilotStore {
  host: boolean;
  user: boolean;
}

export const Switch = () => {
  const [store, setStore] = createStore<PilotStore>({
    host: false,
    user: false,
  });
  return (
    <div>
      <div class="mb-lg gap-lg mx-auto flex w-fit">
        <Button
          class={`p-lg text-ivory rounded-full bg-black text-2xl font-bold hover:bg-black/80 ${store.host ? "ring-ivory ring-2" : ""}`}
          onClick={() => {
            setStore("host", (prev) => !prev);
            setStore("user", false);
          }}
        >
          For Hosts
        </Button>
        <Button
          class={`p-lg text-ivory rounded-full bg-black text-2xl font-bold hover:bg-black/80 ${store.user ? "ring-ivory ring-2" : ""}`}
          onClick={() => {
            setStore("user", (prev) => !prev);
            setStore("host", false);
          }}
        >
          For Users
        </Button>
      </div>
      <div class="px-lg mx-auto max-w-screen-sm">
        {store.host && <Pilot />}
        {store.user && <Waitlist />}
      </div>
    </div>
  );
};
