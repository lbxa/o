import { createSignal } from "solid-js";

import solidLogo from "./assets/solid.svg";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="w-full bg-red-100">
      <div class="flex">
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="w-1/3 m-auto" alt="Solid logo" />
        </a>
      </div>
      <h1 class="text-5xl font-black">Welcome to O!</h1>
      <div class="bg-gray-300">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
      </div>
    </div>
  );
}

export default App;
