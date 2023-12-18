import { Container } from "./Container";

export function ErrorScreen({ error }: { error?: string }) {
  if (error === "NO_INVITE_CODE") {
    return (
      <Container>
        <h1>no invite code</h1>
      </Container>
    );
  }
  if (error === "INVALID_INVITE_CODE") {
    return (
      <Container>
        <h1>invalid code</h1>
      </Container>
    );
  }
  return <Container>error</Container>;
}
