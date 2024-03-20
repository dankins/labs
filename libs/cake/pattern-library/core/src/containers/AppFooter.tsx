import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, TikTokIcon } from "@danklabs/pattern-library/core";

export function AppFooter() {
  return (
    <footer className="px-10 pt-10 pb-5">
      <div className="border-t-2 border-t-dark/10 flex flex-col md:flex-row items-center">
        <div className="hidden grow flex-col md:flex md:flex-row md:gap-4 items-center">
          <Link className="pt-2 pb-1" href="/account/faq">
            Cake FAQs
          </Link>
          <Spacer />
          <Link className="pt-2 pb-1" href="/account/contact">
            Contact Cake
          </Link>
          <Spacer />
          <Link className="pt-2 pb-1" href="/account/terms-and-conditions">
            Terms of Use
          </Link>
          <Spacer />
          <Link className="pt-2 pb-1" href="/account/privacy-policy">
            Privacy Policy
          </Link>
        </div>
        <div className="hidden md:block">© 2024 Cake. All rights reserved.</div>
      </div>
      <div className="flex flex-row py-3 md:py-0">
        <div className="grow flex flex-row gap-1">
          <Link href="https://instagram.com/">
            <InstagramIcon />
          </Link>
          <Link href="https://tiktok.com/">
            <TikTokIcon />
          </Link>
        </div>
        <div>
          <Image
            alt="Cake Logo"
            src="/images/logo.svg"
            className="w-[66px] h-[19px]"
            height={100}
            width={100}
          />
        </div>
      </div>
      <div className="visible md:hidden text-center">
        © 2024 Cake. All rights reserved.
      </div>
    </footer>
  );
}

function Spacer() {
  return <span className="md:pt-2 md:pb-1">•</span>;
}
