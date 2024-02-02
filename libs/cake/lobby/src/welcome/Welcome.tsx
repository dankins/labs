import { Button, ChevronRightIcon } from "@danklabs/pattern-library/core";
import { useQueryStringUpdater } from "../util/searchParams";
import { FeatureImageContainer } from "@danklabs/cake/pattern-library/core";
import { getPage } from "@danklabs/cake/cms";
import { ViewportSwitcher } from "@danklabs/pattern-library/motion";
import { TriggerScrollButton } from "./TriggerScrollButton";
import { ValueProp1 } from "./ValueProp1";
import { ValueProp2 } from "./ValueProp2";
import { WelcomePanel } from "./WelcomePanel";
import { ValueProp3 } from "./ValueProp3";
import { BrandSelection } from "../brand-selection/BrandSelection";

export async function Welcome() {
  const page = await getPage("foyer");

  return (
    <div className="scroll-smooth">
      <div>
        <WelcomePanel heroImage={page.heroImage} />
      </div>
      <div id="panel1">
        <ValueProp1 />
      </div>
      <div id="panel2">
        <ValueProp2 />
      </div>
      <div id="panel3">
        <ValueProp3 />
      </div>
    </div>
  );
}
