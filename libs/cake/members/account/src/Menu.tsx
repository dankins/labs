import {
  BookmarkIcon,
  CreditCardIcon,
  NotificationsIcon,
  ProfileIcon,
  TicketIcon,
  UserIcon,
} from "@danklabs/pattern-library/core";
import Link from "next/link";

export function Menu() {
  return (
    <div>
      <div>
        <h1 className="pt-4 pb-2 uppercase text-xs">My Account</h1>
        <AccountLink
          icon={<ProfileIcon />}
          href="/account/profile"
          heading="Member Profile"
          subheading="Manage my personal details"
        />
        <AccountLink
          icon={<CreditCardIcon />}
          href="/account/membership"
          heading="Manage Account"
          subheading="Manage my Cake Membership"
        />
        <AccountLink
          icon={<TicketIcon />}
          href="/account/invites"
          heading="Cake Invites"
          subheading="Manage my Cake Invitations"
        />
        <AccountLink
          icon={<BookmarkIcon />}
          href="/account/favorites"
          heading="My Favorites"
          subheading="Manage Favorited Brands"
        />
        <AccountLink
          icon={<NotificationsIcon />}
          href="/account/notifications"
          heading="Notification Preferences"
          subheading="Manage how we stay in touch"
        />
      </div>
      <div>
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
    </div>
  );
}

function AccountLink({
  icon,
  heading,
  subheading,
  href,
}: {
  icon: React.ReactNode;
  heading: string;
  subheading?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="py-2 border-0 border-b border-white/25 flex flex-row justify-top gap-2 last:border-b-0 "
    >
      <div className="pt-1 flex flex-row justify-top text-black stroke-black">
        {" "}
        {icon}
      </div>

      <div>
        <div className="text-base font-medium">{heading}</div>
        {subheading && (
          <div className="text-sm text-gray-400 font-normal">{subheading}</div>
        )}
      </div>
    </Link>
  );
}
