import { createSignal, onMount } from "solid-js";

export const ArtTitle = () => {
  const [bgClass, setBgClass] = createSignal<string>("");

  onMount(() => {
    const day = new Date().getDay();

    const evens = ["picasso", "warhol"];
    const odds = ["raphael"];

    const isEvenDay = day % 2 === 0;
    const bgClassName = isEvenDay
      ? evens[day % evens.length]
      : odds[day % odds.length];

    setBgClass("bg-" + bgClassName);
  });

  return (
    <h1
      class={`inline ${bgClass()} bg-contain 
              bg-clip-text bg-center text-6xl 
              font-black text-transparent md:text-7xl
            `}
    >
      oNex
    </h1>
  );
};
