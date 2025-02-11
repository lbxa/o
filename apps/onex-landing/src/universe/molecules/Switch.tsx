import { createStore } from "solid-js/store";

import { Button } from "@/universe/atoms";
import { Beta } from "@/views/Beta";
import { FaQ } from "@/views/FaQ";

interface PilotStore {
  // host: boolean;
  // user: boolean;
  beta: boolean;
  faq: boolean;
}

export const Switch = () => {
  const [store, setStore] = createStore<PilotStore>({
    // host: false,
    // user: false,
    beta: false,
    faq: false,
  });
  return (
    <div>
      <div class="mx-auto mb-lg flex w-fit gap-lg">
        <Button
          class={`rounded-full bg-black p-lg text-2xl font-bold text-ivory hover:bg-black/80 ${store.beta ? "ring-2 ring-ivory" : ""}`}
          onClick={() => {
            setStore("beta", (prev) => !prev);
            setStore("faq", false);
          }}
        >
          Beta
        </Button>
        <Button
          class={`rounded-full bg-black p-lg text-2xl font-bold text-ivory hover:bg-black/80 ${store.faq ? "ring-2 ring-ivory" : ""}`}
          onClick={() => {
            setStore("faq", (prev) => !prev);
            setStore("beta", false);
          }}
        >
          FAQ
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
        {/* {store.host && <Pilot />}
        {store.user && <Waitlist />} */}
        {store.beta && <Beta />}
        {store.faq && <FaQ />}
      </div>
    </div>
  );
};
