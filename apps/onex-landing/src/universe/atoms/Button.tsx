import type { JSX } from "solid-js";
import type { ParentProps } from "solid-js";
import { lazy, splitProps } from "solid-js";

const CheckSvg = lazy(() => import("../../icons/CheckSvg"));

type ButtonProps = {
  loading?: boolean;
  checked?: boolean;
  checkedText?: string;
  error?: boolean;
  errorText?: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ParentProps<ButtonProps>) => {
  const [, buttonProps] = splitProps(props, ["checked", "loading", "children"]);

  const content = (): JSX.Element | string => {
    if (props.loading) {
      return "Loading...";
    } else if (props.checked) {
      return (
        <div class="flex justify-center gap-sm">
          {/* <Svg src={CheckSvg} class="w-md fill-white" /> */}
          <CheckSvg class="w-md fill-white" />
          {props.checkedText ?? "DONE"}
        </div>
      );
    } else {
      return props.children;
    }
  };

  return (
    <button
      type="submit"
      class="w-full rounded-xl bg-black p-sm px-md font-bold text-white"
      {...buttonProps}
      classList={{
        "bg-green-500": props.checked,
      }}
    >
      {content()}
    </button>
  );
};
