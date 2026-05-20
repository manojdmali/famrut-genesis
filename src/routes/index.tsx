import { createFileRoute } from "@tanstack/react-router";
import { Wizard } from "@/components/onboarding/Wizard";

export const Route = createFileRoute("/")({
  component: Wizard,
});
