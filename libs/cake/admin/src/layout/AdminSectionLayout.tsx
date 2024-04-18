"use client";
import { useSelectedLayoutSegments } from "next/navigation";
import { AdminNav, NavItem } from "@danklabs/cake/pattern-library/core";
import { ClerkProvider } from "@clerk/nextjs";
import {
  BrandIcon,
  MembersIcon,
  OffersIcon,
  SettingsIcon,
  TicketIcon,
  UserIcon,
} from "@danklabs/pattern-library/core";

export function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segments = useSelectedLayoutSegments();
  const isBrandDetail = segments[0] === "brands" && !!segments[1];
  return (
    <ClerkProvider>
      <div className="flex flex-row">
        <AdminNav subheading="admin">
          <NavItem
            href={"/admin/brands"}
            title="Brands"
            icon={BrandIcon}
            match={["brands"]}
          >
            {isBrandDetail && (
              <>
                <NavItem
                  href={`/admin/brands/${segments[1]}`}
                  title={segments[1]}
                  icon={BrandIcon}
                  match={["brands", segments[1]]}
                >
                  <NavItem
                    href={`/admin/brands/${segments[1]}/offers`}
                    title="Offers"
                    icon={OffersIcon}
                    match={["brands", segments[1], "offers"]}
                  />
                  <NavItem
                    href={`/admin/brands/${segments[1]}/members`}
                    title="Members"
                    icon={MembersIcon}
                    match={["brands", segments[1], "members"]}
                  />
                  <NavItem
                    href={`/admin/brands/${segments[1]}/settings`}
                    title="Settings"
                    icon={SettingsIcon}
                    match={["brands", segments[1], "settings"]}
                  />
                </NavItem>
              </>
            )}
          </NavItem>
          <NavItem
            href="/admin/invitations"
            title="Invitations"
            icon={TicketIcon}
            match={["invitations"]}
          />
          <NavItem
            href="/admin/members"
            title="Members"
            icon={UserIcon}
            match={["members"]}
          />
          <NavItem
            href="/admin/settings"
            title="Settings"
            icon={SettingsIcon}
            match={["settings"]}
          />
        </AdminNav>
        <div className="px-4 grow">{children}</div>
        <div className="my-10"></div>
      </div>
    </ClerkProvider>
  );
}
