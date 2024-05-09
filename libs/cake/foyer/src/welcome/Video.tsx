import {
  ArrowDownIcon,
  CircleButton,
  Heading3,
} from "@danklabs/pattern-library/core";

export function Video({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <Heading3> video placeholder</Heading3>
      <CircleButton
        onClick={onClick}
        size="lg"
        icon={<ArrowDownIcon />}
      ></CircleButton>
    </div>
  );
}
