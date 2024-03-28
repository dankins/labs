import { SignOut } from "@danklabs/cake/pattern-library/core";
import {
  ChevronUpIcon,
  CloseIcon,
  CreditCardIcon,
  FavoriteFilledIcon,
  InvitesIcon,
  NotificationsIcon,
  Paragraph2,
  PrimaryButton,
  ProfileIcon,
  SecondaryButton,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { AccountLink } from "./AccountLink";

export function Menu() {
  return (
    <div className="bg-[#E9DED3] p-4 mb-10 rounded-sm md:p-0 md:bg-transparent">
      <div className="md:hidden flex flex-row items-center">
        <h1 className="uppercase text-sm grow">Account Menu</h1>
        <SecondaryButton
          data-collapse-toggle="accountmenu"
          className="aria-expanded:rotate-180"
        >
          <ChevronUpIcon />
        </SecondaryButton>
      </div>
      <div id="accountmenu" className="hidden md:block">
        <div>
          <AccountLink
            icon={<ProfileIcon />}
            href="/account/profile"
            heading="Member Profile"
          />
          <AccountLink
            icon={<CreditCardIcon />}
            href="/account/membership"
            heading="Manage Account"
          />
          <AccountLink
            icon={<InvitesIcon />}
            href="/account/invites"
            heading="Cake Invites"
          />
          <AccountLink
            icon={<FavoriteFilledIcon />}
            href="/account/favorites"
            heading="My Favorites"
          />
          <AccountLink
            icon={<NotificationsIcon />}
            href="/account/notifications"
            heading="Notification Preferences"
          />
        </div>
        <div className="md:hidden">
          <h1 className="pt-8 pb-2 uppercase text-xs">Cake Details</h1>
          <AccountLink icon={<UserIcon />} href="/account/faq" heading="FAQ" />
          <AccountLink
            icon={<UserIcon />}
            href="/account/support"
            heading="Support"
          />
          <AccountLink
            icon={<UserIcon />}
            href="/account/privacy-policy"
            heading="Privacy Policy"
          />
          <AccountLink
            icon={<UserIcon />}
            href="/account/terms-and-conditions"
            heading="Terms and Conditions"
          />
        </div>
        <div>
          <SignOut className="pt-6 block text-sm cursor-pointer font-apris">
            Sign Out
          </SignOut>
        </div>
      </div>
    </div>
  );
}
