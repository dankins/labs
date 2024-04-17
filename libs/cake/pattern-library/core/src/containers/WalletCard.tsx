import { SanityImage, SanityImageType } from "../images";

export function WalletCard({
  backgroundImage,
  logoImage,
  darken,
  content,
  footer,
}: {
  backgroundImage?: SanityImageType;
  logoImage?: SanityImageType;
  darken?: boolean;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const cardGradient = darken ? `rgba(0,0,0,0.5)` : ``;
  return (
    <div className="bg-white aspect-[2/1] min-w-[200px] w-full rounded-lg shadow-sm  justify-start items-start inline-flex cursor-pointer overflow-hidden">
      <div className="w-full h-full relative max-w-[600px] aspect-wallet">
        {backgroundImage && (
          <SanityImage
            alt={`Card Background Image`}
            image={backgroundImage}
            height={0}
            width={0}
            style={{ height: "1.25rem", width: "auto" }}
          />
        )}
        <div className="p-3 absolute top-0 left-0 w-full h-full flex flex-col">
          <div>
            {logoImage && (
              <SanityImage
                alt={`Brand Logo`}
                image={logoImage}
                height={0}
                width={0}
                style={{ height: "1.25rem", width: "auto" }}
              />
            )}
          </div>
          {content && <div className="grow">{content}</div>}
          {footer && <div className="p-3 ">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
