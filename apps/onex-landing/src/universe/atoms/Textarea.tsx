import type { JSX } from "solid-js";

interface TextAreaInputProps {
  error?: string;
}

export const TextAreaInput = (
  props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaInputProps
) => {
  return (
    <textarea
      rows={5}
      class="mb-md p-sm w-full rounded-lg border-2 border-solid border-black bg-gray-100 text-black"
      placeholder="Write us a message :)"
      {...props}
    ></textarea>
  );
};
