"use client";
import {
  BottomSheet,
  Button,
  Checkbox,
  CopyIcon,
  EmailIcon,
  TextArea,
  TextInput,
  UserIcon,
} from "@danklabs/pattern-library/core";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isWebShareAvailable } from "@danklabs/utils";
import { CopyButton, useToast } from "@danklabs/pattern-library/motion";
import { ShareButton } from "./ShareButton";

export type Invite = {
  id: string;
  recipientName: string | null;
  code: string | null;
  expiration: Date | null;
};

export function InviteActionButton({
  assignInviteAction,
  emailInviteAction,
  cta,
  onlyShare,
  invite,
}: {
  assignInviteAction(formData: FormData): Promise<Invite>;
  emailInviteAction(formData: FormData): Promise<boolean>;
  cta: string;
  onlyShare?: boolean;
  invite?: Invite;
}) {
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen(true);
  }
  return (
    <>
      <Button background="white" onClick={handleClick}>
        {cta}
      </Button>
      <NewInviteBottomSheet
        assignInviteAction={assignInviteAction}
        emailInviteAction={emailInviteAction}
        onlyShare={onlyShare}
        open={open}
        onClose={() => setOpen(false)}
        invite={invite}
      />
    </>
  );
}

export function NewInviteBottomSheet({
  invite,
  open,
  onClose,
  assignInviteAction,
  emailInviteAction,
  onlyShare,
}: {
  open: boolean;
  onClose(): void;
  assignInviteAction(formData: FormData): Promise<Invite>;
  emailInviteAction(formData: FormData): Promise<boolean>;
  onlyShare?: boolean;
  invite?: Invite;
}) {
  const { addToast } = useToast();
  const [screen, setScreen] = useState(onlyShare ? "share" : "create");
  const [createdInvite, setInvite] = useState<Invite | undefined>(undefined);
  function handleClose() {
    onClose();
    setScreen(onlyShare ? "share" : "create");
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
        {screen === "share" && (
          <ShareScreen
            key="share"
            inviteCode={invite?.code || createdInvite?.code!}
            recipientName={
              invite?.recipientName! || createdInvite?.recipientName!
            }
            emailInviteAction={emailInviteAction}
            onEmailSent={() => {
              addToast("Email sent successfully!");
              handleClose();
            }}
          />
        )}
      </AnimatePresence>
    </BottomSheet>
  );
}

function CreateScreen({
  onCreate,
  assignInviteAction,
}: {
  assignInviteAction(formData: FormData): Promise<Invite>;
  onCreate(invite: Invite): void;
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
        <div>
          <Button type="submit" loading={loading}>
            Create Invitation
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

function ShareScreen({
  inviteCode,
  recipientName,
  emailInviteAction,
  onEmailSent,
}: {
  inviteCode: string;
  recipientName: string;
  emailInviteAction(formData: FormData): Promise<boolean>;
  onEmailSent(): void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const link = `${process.env.NEXT_PUBLIC_SITE_URL}invitation?code=${inviteCode}`;
  const canShare = useMemo(isWebShareAvailable, []);
  const defaultMessage = useMemo(() => {
    return `${recipientName}, join me on Cake, an invite only opportunity to gain the benefits and rewards from some of the worlds greatest brands! 
Hurry, the invite expires in 48 hours!
    
${link}
    `;
  }, []);

  async function handleSubmit(formData: FormData) {
    await emailInviteAction(formData);
    onEmailSent();
  }

  return (
    <motion.div
      initial={{ translateX: "100vw" }}
      animate={{ translateX: "0" }}
      transition={{ duration: 0.2 }}
    >
      <>
        <p>
          Almost done! Personalize your invite or just select share invite to
          send!
        </p>
        <form action={handleSubmit}>
          <div className="my-3 w-full">
            <TextArea
              ref={ref}
              rows={7}
              name="message"
              label="Invite Message"
              defaultValue={defaultMessage}
            />
          </div>
          <div className="grow" />
          <div>
            <Checkbox
              label="Invite by email"
              helperText="Have Cake email my Invite."
              onChange={() => setEmailChecked(!emailChecked)}
              className="my-4"
            />
          </div>
          {emailChecked && (
            <div className="my-4 flex flex-col gap-6">
              <TextInput
                icon={<EmailIcon />}
                name="email"
                label="Email Address"
              />
              <div>
                <Button type="submit">Email Invite</Button>
              </div>
            </div>
          )}
        </form>

        {!emailChecked && (
          <div>
            {canShare ? (
              <ShareButton
                title={"Join me on Cake!"}
                url={link}
                text={() => ref.current?.value.replace(link, "") || ""}
              />
            ) : (
              <CopyButton
                text={() => ref.current?.value || ""}
                onClick={() => ({})}
              >
                Copy Invitation <CopyIcon />
              </CopyButton>
            )}
          </div>
        )}
      </>
    </motion.div>
  );
}
