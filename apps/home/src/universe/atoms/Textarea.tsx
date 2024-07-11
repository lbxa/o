import type { JSX } from "solid-js";

export const TextArea = (
  props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  return (
    <textarea
      rows={5}
      class="mb-md w-full rounded-lg border-2 border-solid border-black bg-gray-100 p-sm"
      placeholder="Write us a message :)"
      {...props}
    ></textarea>
  );
};
