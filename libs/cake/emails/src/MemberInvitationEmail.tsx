import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";

export type MemberInvitationProps = {
  inviteLink: string;
  memberName: string;
  inviterMessage: string;
};
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export function MemberInvitationEmailSubject(memberName: string) {
  return `🥂 You're in: ${memberName} is sharing their access to Cake`;
}

export function MemberInvitationEmail({
  memberName,
  inviteLink,
  inviterMessage,
}: MemberInvitationProps) {
  const authorImage = "";
  const previewText = `Read ${memberName}'s review`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* <Section>
            <Img
              src={`${baseUrl}/images/missing-brand-logo.png`}
              width="96"
              height="30"
              alt="Cake"
            />
          </Section>
          <Section>
            <Img
              src={authorImage}
              width="96"
              height="96"
              alt={memberName}
              style={userImage}
            />
          </Section> */}
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={paragraph}>
                {memberName} thought of you when they got their exclusive
                invites to Cake. Here's what they said:
              </Text>
              <Text style={message}>{inviterMessage}</Text>
              <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                Cake is an exclusive community where fashion's forefront meets.
                Think access to top-tier deals, insider info, and a network
                that's as stylish as you are.
              </Text>
              <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                This invite from {memberName} is your key. Rare, just like you.
                Your invitation will expire in 7 days, so act soon.
              </Text>

              <Button style={button} href={inviteLink}>
                View My Invitation
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <EmailFooter domain={baseUrl} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

MemberInvitationEmail.PreviewProps = {
  memberName: "Dan",
  inviteLink: "http://localhost:4300/invitation?code=strictly-jealous-option",
} as MemberInvitationProps;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const message = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#ff5a5f",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const link = {
  ...paragraph,
  color: "#ff5a5f",
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

export default MemberInvitationEmail;
