export const Header = () => {
  // const [bgClass, setBgClass] = createSignal<string>("");

  // onMount(() => {
  //   const day = new Date().getDay();
  //   const art = [
  //     "bg-picasso",
  //     "bg-warhol",
  //     "bg-raphael",
  //     "bg-monet",
  //     "bg-lichtenstein",
  //   ];
  //   const artOfTheDay = art[day % art.length] ?? "bg-picasso";
  //   setBgClass(artOfTheDay);
  // });

  return (
    <div class="mb-xl bg-indigo py-sm mx-auto flex w-full flex-col justify-around rounded-b-3xl text-center lg:rounded-none">
      <h1 class="text-ivory inline bg-contain bg-clip-text bg-center text-6xl font-black md:text-7xl">
        oNex
      </h1>
    </div>
  );
};
