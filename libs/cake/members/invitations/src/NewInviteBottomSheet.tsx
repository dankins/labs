"use client";
import {
  BottomSheet,
  Button,
  CopyIcon,
  TextArea,
  TextInput,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isWebShareAvailable } from "@danklabs/utils";
import { CopyButton } from "@danklabs/pattern-library/motion";

export type Invite = {
  id: string;
  recipientName: string;
  code: string;
  expiration: Date;
};

export function NewInviteButton({
  assignInviteAction,
}: {
  assignInviteAction(formData: FormData): Promise<Invite>;
}) {
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen(true);
  }
  return (
    <>
      <Button background="white" onClick={handleClick}>
        Invite
      </Button>
      <NewInviteBottomSheet
        assignInviteAction={assignInviteAction}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export function NewInviteBottomSheet({
  open,
  onClose,
  assignInviteAction,
}: {
  open: boolean;
  onClose(): void;
  assignInviteAction(formData: FormData): Promise<Invite>;
}) {
  const [screen, setScreen] = useState("create");
  const [invite, setInvite] = useState<Invite | undefined>(undefined);
  function handleClose() {
    onClose();
    setScreen("create");
    setInvite(undefined);
  }
  return (
    <BottomSheet open={open} onClose={handleClose}>
      <AnimatePresence>
        <h1 key="title" className="text-3xl font-medium text-pink-500">
          Share Invite
        </h1>
        {screen === "create" && (
          <CreateScreen
            key="create"
            assignInviteAction={assignInviteAction}
            onCreate={(invitation) => {
              setScreen("share");
              setInvite(invitation);
            }}
          />
        )}
        {screen === "share" && <ShareScreen key="share" invite={invite!} />}
      </AnimatePresence>
    </BottomSheet>
  );
}

function CreateScreen({
  onCreate,
  assignInviteAction,
}: {
  assignInviteAction(formData: FormData): Promise<Invite>;
  onCreate(invite: {
    id: string;
    recipientName: string;
    code: string;
    expiration: Date;
  }): void;
}) {
  const [loading, setLoading] = useState(false);
  async function handleCreate(formData: FormData) {
    setLoading(true);
    const invite = await assignInviteAction(formData);
    setLoading(false);
    onCreate(invite);
  }
  return (
    <motion.div exit={{ translateX: "-100vw", transition: { duration: 0.2 } }}>
      <form action={handleCreate}>
        <p>Love Cake? Invite others to join you, and share the love.</p>
        <div></div>
        <div className="my-3 w-full">
          <TextInput
            icon={<UserIcon />}
            label="Name for Invite"
            name="name"
            placeholder="Your friend's name"
          />
        </div>
        <div className="grow"></div>
        {isWebShareAvailable() && <div>share!</div>}
        <div>
          <Button type="submit">Create Invitation</Button>
        </div>
      </form>
    </motion.div>
  );
}

function ShareScreen({ invite }: { invite: Invite }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const link = `${process.env.NEXT_PUBLIC_SITE_URL}/invite?code=${invite.code}`;
  const canShare = useMemo(isWebShareAvailable, []);
  const defaultMessage = useMemo(() => {
    return `${invite.recipientName}, join me on Cake, an invite only opportunity to gain the benefits and rewards from some of the worlds greatest brands! 
Hurry, the invite expires in 48 hours!
    
${link}
    `;
  }, []);

  return (
    <motion.div
      initial={{ translateX: "100vw" }}
      animate={{ translateX: "0" }}
      transition={{ duration: 0.2 }}
    >
      <p>
        Almost done! Personalize your invite or just select share invite to
        send!
      </p>
      <div></div>
      <div className="my-3 w-full">
        <TextArea
          ref={ref}
          rows={7}
          name="message"
          label="Invite Message"
          defaultValue={defaultMessage}
        />
      </div>
      <div className="grow"></div>

      <div>
        {canShare ? (
          <div>can share</div>
        ) : (
          <CopyButton text={() => ref.current?.value || ""}>
            Copy Invitation <CopyIcon />
          </CopyButton>
        )}
      </div>
    </motion.div>
  );
}
