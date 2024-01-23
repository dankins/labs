import { Hr, Link, Text } from "@react-email/components";

export function EmailFooter({ domain }: { domain: string }) {
  return (
    <>
      <Text style={footer}>CFB, Inc., 800 South Street, Waltham MA</Text>
      <Link href={domain} style={reportLink}>
        Report unsafe behavior
      </Link>
    </>
  );
}

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};
