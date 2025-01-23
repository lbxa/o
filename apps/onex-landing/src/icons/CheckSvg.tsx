import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

// TODO rethink SVGs eventually. Might have to opt for inlining them into JSX.
//  more flexible styling - just means bigger bundle size, but maybe code splitting
// fixes that?
export default (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  const [, svgProps] = splitProps(props, ["xmlns", "viewBox"]);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...svgProps}>
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  );
};
