import * as React from "react";

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export type IconType = (props: IconBaseProps) => JSX.Element;
export function IconBase(
  props: IconBaseProps & { attr?: Record<string, string> }
): JSX.Element {
  const { attr, size, title, ...svgProps } = props;
  const computedSize = size || "1em";
  let className;
  if (props.className)
    className = (className ? className + " " : "") + props.className;

  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      {...attr}
      {...svgProps}
      className={className}
      style={{
        display: "inline-block",
        color: props.color,
        ...props.style,
      }}
      height={computedSize}
      width={computedSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      {props.children}
    </svg>
  );
}
