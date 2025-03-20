import { createSignal } from "solid-js";

import { Button } from "@/universe/atoms";
import { Beta } from "@/views/Beta";
import { Contact } from "@/views/Contact";
import { FaQ } from "@/views/FaQ";
import { Pilot } from "@/views/Pilot";

type Tab = "beta" | "gym" | "faq" | "contact" | null;

const TABS = [
  { id: "beta" as const, label: "Early Access", component: Beta },
  { id: "gym" as const, label: "For Gyms", component: Pilot },
  { id: "faq" as const, label: "FAQ", component: FaQ },
  { id: "contact" as const, label: "Contact", component: Contact },
] as const;

export const Switch = () => {
  const [activeTab, setActiveTab] = createSignal<Tab>(null);

  return (
    <div class="px-md">
      <div class="mx-auto mb-lg flex w-fit flex-wrap justify-center gap-lg">
        {TABS.map(({ id, label }) => (
          <Button
            class={`rounded-full bg-black p-lg text-2xl font-bold 
                  text-ivory hover:bg-black/80 
               ${activeTab() === id ? "ring-2 ring-ivory" : ""}`}
            onClick={() => setActiveTab(activeTab() === id ? null : id)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div class="mx-auto max-w-screen-sm">
        {TABS.map(
          ({ id, component: Component }) => activeTab() === id && <Component />
        )}
      </div>
    </div>
  );
};
