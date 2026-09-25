import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "white" | "fog" | "navy";

const toneClasses: Record<Tone, string> = {
  white: "bg-white text-navy-950",
  fog: "bg-fog-100 text-navy-950",
  navy: "bg-navy-950 text-white",
};

export function Section({
  children,
  tone = "white",
  className = "",
  containerClassName = "",
  as: As = "section",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
}) {
  return (
    <As className={`py-14 sm:py-20 ${toneClasses[tone]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </As>
  );
}
