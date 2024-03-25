import { FeatureImageContainer } from "@danklabs/cake/pattern-library/core";
import { Button, PrimaryButton } from "@danklabs/pattern-library/core";

export function WelcomePanel({ heroImage }: { heroImage: any }) {
  return (
    <div className="max-w-[500px]">
      <FeatureImageContainer
        image={heroImage}
        overlay={
          <div className="w-full h-full absolute top-0 bg-neutral/70"></div>
        }
      >
        <div className="h-full flex flex-col items-end px-5">
          <div className="grow flex flex-col justify-center items-center gap-4 pt-[300px]">
            <h1 className="text-6xl font-fancy">Welcome, Margaret.</h1>
            <div className="text-base font-normal leading-6">
              Katherine wants you to join her on CAKE where you’re treated to
              special, friend-of-the-brand privileges, perks and surprises.
              <br /> <br />
              She is having too much fun shopping the latest trends so she asked
              us to fill you in on all the delicious details about CAKE.
            </div>
            <div>
              <PrimaryButton href={`?step=account`}>
                Tell Me About Cake
              </PrimaryButton>
            </div>
          </div>
        </div>
      </FeatureImageContainer>
    </div>
  );
}
