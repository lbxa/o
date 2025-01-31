import { Blur, Switch } from "@universe/molecules";

// import { FaQ } from "./views/FaQ/FaQ";
import { Footer } from "./views/Footer";
import { Mission } from "./views/Mission";
import { Why } from "./views/Why";

export const App = () => {
  return (
    <div class="relative">
      <Blur />
      <div class="relative z-10 w-full">
        <Mission />
        <div class="flex flex-col gap-6xl">
          <Why />
          <Switch />
          {/* <FaQ /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
};
