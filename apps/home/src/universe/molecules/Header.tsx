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
    <div class="mx-auto mb-xl flex w-full flex-col justify-around rounded-b-3xl bg-indigo py-sm text-center lg:rounded-none">
      <h1 class="inline bg-contain bg-clip-text bg-center text-6xl font-black text-ivory md:text-7xl">
        oNex
      </h1>
    </div>
  );
};
