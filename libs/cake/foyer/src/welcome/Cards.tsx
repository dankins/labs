import {
  ArrowDownIcon,
  CircleButton,
  Heading3,
} from "@danklabs/pattern-library/core";
import Image from "next/image";

export function Cards({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <Image
        src="/images/foyer/cardstack.png"
        alt="Card stack"
        width={608}
        height={1111}
        className="w-full h-auto"
      />
      <CircleButton
        onClick={onClick}
        size="lg"
        icon={<ArrowDownIcon />}
      ></CircleButton>
    </div>
  );
}
