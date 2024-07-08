import { Title } from "../universe/atoms";

export const Join = () => {
  return (
    <div>
      <Title>Join Us</Title>
      <span></span>
      <input
        type="email"
        placeholder="name@email.com"
        class="mb-md w-full border-2 border-solid border-black bg-gray-100 p-sm"
      />
      <button class="w-full rounded-lg bg-black p-sm px-md font-bold text-white">
        JOIN THE WAITLIST
      </button>
    </div>
  );
};