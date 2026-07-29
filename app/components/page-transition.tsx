import { ViewTransition } from "react";

const directionalTransition = {
  "nav-back": "nav-back",
  "nav-forward": "nav-forward",
  default: "none",
} as const;

export function PageTransition({
  children,
  name,
  transitionKey,
}: {
  children: React.ReactNode;
  name: string;
  transitionKey?: string;
}) {
  return (
    <ViewTransition
      key={transitionKey}
      name={name}
      enter={directionalTransition}
      exit={directionalTransition}
      share={directionalTransition}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
