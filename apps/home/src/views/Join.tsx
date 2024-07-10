import { Title } from "../universe/atoms";

export const Join = () => {
  return (
    <div class="mb-xl">
      <Title>Join Us</Title>
      <input
        type="email"
        placeholder="name@email.com"
        class="mb-md w-full rounded-lg border-2 border-solid border-black bg-gray-100 p-sm"
      />
      <button class="w-full rounded-lg bg-black p-sm px-md font-bold text-white">
        JOIN THE WAITLIST
      </button>
    </div>
  );
};
