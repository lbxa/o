import type { JSX } from "solid-js";

export const Input = (props: JSX.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      class="mb-md w-full rounded-lg border-2 border-solid border-black bg-gray-100 p-sm"
      {...props}
    />
  );
};
