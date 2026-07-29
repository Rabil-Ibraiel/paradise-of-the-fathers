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
    <div
      className="page-transition-shell"
      data-page-transition={name}
      key={transitionKey}
    >
      {children}
    </div>
  );
}
