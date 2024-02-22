import { Analytics, UserTraits } from "@segment/analytics-node";
import { cookies } from "next/headers";
import { ServerTrackingEvent } from "./tracking_plan";

const ANONYMOUS_COOKIE_NAME = "ajs_anonymous_id";

const analytics = new Analytics({
  writeKey: process.env["NEXT_PUBLIC_ANALYTICS_WRITE_KEY"]!,
});

export function getAnonymousId() {
  const c = cookies();
  return c.has(ANONYMOUS_COOKIE_NAME)
    ? c.get(ANONYMOUS_COOKIE_NAME)?.value
    : undefined;
}

export function track(userId: string, event: ServerTrackingEvent) {
  const { name: eventName, ...properties } = event;
  analytics.track({
    userId,
    event: eventName,
    properties,
  });
}

export function trackAnon(event: ServerTrackingEvent) {
  const anonymousId = getAnonymousId();
  if (!anonymousId) {
    throw new Error("unable to retrieve anonymous id");
  }
  const { name: eventName, ...properties } = event;
  analytics.track({
    anonymousId,
    event: eventName,
    properties,
  });
}

export function identify(userId: string, traits: UserTraits) {
  const anonymousId = getAnonymousId();
  analytics.identify({
    userId,
    anonymousId,
    traits,
  });
}

export function identifyAnon(
  email: string,
  traits: Exclude<UserTraits, "email">
) {
  const allTraits: UserTraits = { email, ...traits };
  const anonymousId = getAnonymousId();
  if (!anonymousId) {
    throw new Error("unable to retrieve anonymous id");
  }

  analytics.identify({
    anonymousId,
    traits: allTraits,
    integrations: {
      Klaviyo: {
        confirmOptin: false, // optional
      },
    },
  });
}
