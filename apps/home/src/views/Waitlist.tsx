import { Title } from "../universe/atoms";

export const Waitlist = () => {
  return (
    <div class="mb-xl">
      <Title>Join the Waitlist</Title>
      <p class="mb-sm">
        Don't want to be an early user but still interested? Join our waitlist
        and you'll be notified as soon as we launch our general release!
      </p>
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
