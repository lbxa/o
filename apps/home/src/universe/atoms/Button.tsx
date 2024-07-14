import type { JSX } from "solid-js";
import type { ParentProps } from "solid-js";
import { splitProps } from "solid-js";

type Props = {
  loading?: boolean;
  checked?: boolean;
  checkedText?: string;
  error?: boolean;
  errorText?: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ParentProps<Props>) => {
  const [, inputProps] = splitProps(props, ["checked", "loading", "children"]);

  const content = (): JSX.Element | string => {
    if (props.loading) {
      return "Loading...";
    } else if (props.checked) {
      return props.checkedText ?? "DONE";
    } else {
      return props.children;
    }
  };

  return (
    <button
      type="submit"
      class="w-full rounded-lg bg-black p-sm px-md font-bold text-white"
      {...inputProps}
      classList={{
        "bg-green-500": props.checked,
      }}
    >
      {content()}
    </button>
  );
};
