/**
 * Tailwind supported component
 */
interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
  class?: string;
}
export const Svg = (props: Props) => {
  return (
    <img
      src={props.src}
      class={props.class ?? "w-lg"}
      width={props.width}
      height={props.height}
    />
  );
};
