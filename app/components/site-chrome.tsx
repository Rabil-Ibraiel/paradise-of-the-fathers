import Link from "next/link";

export type SiteSection =
  | "home"
  | "saints"
  | "manuscripts"
  | "books"
  | "paradise";

const navigation = [
  { href: "/saints", label: "Saints", section: "saints" },
  { href: "/manuscripts", label: "Manuscripts", section: "manuscripts" },
  { href: "/books", label: "Books", section: "books" },
  {
    href: "/paradise-of-the-fathers",
    label: "Paradise of Fathers",
    section: "paradise",
  },
] as const;

export const Arrow = ({
  direction = "right",
}: {
  direction?: "left" | "right";
}) => (
  <svg
    aria-hidden="true"
    className={direction === "left" ? "is-reversed" : undefined}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5 12h13M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

export const CrossMark = () => (
  <span className="cross-mark" aria-hidden="true">
    <span className="cross-mark__ring" />
    <span className="cross-mark__stem" />
    <span className="cross-mark__arms" />
  </span>
);

function Navigation({
  active,
  className,
  label,
}: {
  active: SiteSection;
  className: string;
  label: string;
}) {
  return (
    <nav className={className} aria-label={label}>
      {navigation.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          aria-current={active === item.section ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader({ active = "home" }: { active?: SiteSection }) {
  return (
    <>
      <header className="site-header persistent-header">
        <Link
          className="brand"
          href="/"
          aria-label="The Paradise of the Fathers, home"
        >
          <CrossMark />
          <span className="brand__text">
            <span className="brand__name">The Paradise of the Fathers</span>
            <span className="brand__syriac" lang="syr" dir="rtl">
              ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ
            </span>
          </span>
        </Link>

        <Navigation
          active={active}
          className="primary-nav"
          label="Primary navigation"
        />

        <Link
          className="header-link"
          href="/saints"
        >
          Begin with a saint
          <Arrow />
        </Link>
      </header>

      <Navigation
        active={active}
        className="mobile-nav"
        label="Mobile navigation"
      />
    </>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Link
        className="brand brand--footer"
        href="/"
      >
        <CrossMark />
        <span className="brand__text">
          <span className="brand__name">The Paradise of the Fathers</span>
          <span className="brand__syriac" lang="syr" dir="rtl">
            ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ
          </span>
        </span>
      </Link>
      <p>
        A new illustrated archive of the saints and spiritual heritage of the
        Church of the East.
      </p>
      <div className="footer-links">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
      <span className="footer-note">
        Independent educational project · Made for remembrance · 2026
      </span>
    </footer>
  );
}
