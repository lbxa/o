import { createSignal, onMount } from "solid-js";

export const ArtTitle = () => {
  const [bgClass, setBgClass] = createSignal<string>("");

  onMount(() => {
    const day = new Date().getDay();
    const art = [
      "bg-picasso",
      "bg-warhol",
      "bg-raphael",
      "bg-monet",
      "bg-lichtenstein",
    ];
    const artOfTheDay = art[day % art.length] ?? "bg-picasso";
    setBgClass(artOfTheDay);
  });

  return (
    <h1
      class={`inline ${bgClass()} bg-contain 
              bg-clip-text bg-center text-6xl font-black 
              text-transparent md:text-7xl
            `}
    >
      oNex
    </h1>
  );
};
