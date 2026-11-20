import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="pt-44 pb-32">
      <p className="font-mono text-xs tracking-wider text-muted uppercase">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-lg text-muted">The link may be out of date.</p>
      <ButtonLink href="/" className="mt-8">
        Back to the homepage
      </ButtonLink>
    </Container>
  );
}
