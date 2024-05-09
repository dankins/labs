import {
  ArrowDownIcon,
  CircleButton,
  Heading3,
} from "@danklabs/pattern-library/core";

export function Cards({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <Heading3>cards placeholder</Heading3>
      <CircleButton
        onClick={onClick}
        size="lg"
        icon={<ArrowDownIcon />}
      ></CircleButton>
    </div>
  );
}
