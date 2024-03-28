import classNames from "classnames";
import { Suspense, useMemo } from "react";
import { auth } from "@clerk/nextjs";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

import { getMemberInvitations } from "@danklabs/cake/services/admin-service";
import {
  ActionButton,
  ClockIcon,
  TicketIcon,
} from "@danklabs/pattern-library/core";
import {
  assignInviteAction,
  cancelInviteAction,
  emailInviteAction,
} from "./actions";
import { InviteActionButton } from "./NewInviteBottomSheet";
import { CancelInviteButton } from "./CancelInviteButton";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);




assignInviteAction={assignInviteAction.bind(undefined, invite.id)}
emailInviteAction={emailInviteAction.bind(
  undefined,
  invite.id,
  invite.code!
)
}


action={cancelInviteAction.bind(undefined, invite.id)}