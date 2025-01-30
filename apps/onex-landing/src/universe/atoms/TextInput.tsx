import type { JSX } from "solid-js";
import { createMemo, splitProps } from "solid-js";

interface TextInputProps {
  error?: string;
}

export const TextInput = (
  props: JSX.InputHTMLAttributes<HTMLInputElement> & TextInputProps
) => {
  const [, inputProps] = splitProps(props, ["value", "error"]);
  const classes = createMemo(() => ({
    "bg-red-200 text-red-900 border-red-900": !!props.error,
  }));

  return (
    <div class="mb-md">
      <input
        class="mb-sm w-full rounded-lg border-2 border-solid border-black bg-gray-100 p-sm text-black"
        classList={classes()}
        {...inputProps}
        id={props.name}
        value={props.value ?? ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      />
      {props.error && (
        <div class="pl-sm text-red-600" id={`${props.name}-error`}>
          {props.error}
        </div>
      )}
    </div>
  );
};
