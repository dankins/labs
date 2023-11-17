import { Centered, FullPage } from '@danklabs/pattern-library/core';
import { GradientBackground } from './GradientBackground';
import { ActionPanel } from './ActionPanel';
import { DankbotChat } from '@danklabs/laboratory/dankbot';

export default async function Page() {
  return (
    <>
      <GradientBackground />
      <FullPage>
        <Centered>
          <ActionPanel>
            <DankbotChat />
          </ActionPanel>
        </Centered>
      </FullPage>
    </>
  );
}
