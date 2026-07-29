# Design Direction

## Visual world

The site belongs to a manuscript-inspired world of parchment, deep East Syriac
green, oxblood, lapis, and restrained gold. It should feel reverent and
editorial rather than ecclesiastical-kitsch or museum-dusty.

## Typography

- Display text: Iowan Old Style with Palatino and Georgia fallbacks.
- Interface and body text: Geist.
- Every Syriac string: the supplied Assyria Alqosh East Syriac font through the
  `--font-syriac` variable.

## Navigation

The four principal destinations are Saints, Manuscripts, Books, and Paradise of
Fathers. They are separate routes, not homepage anchors. Navigation has generous
horizontal space, thin faded dividers, and a full green/paper color reversal on
hover, focus, and the current page.

## Imagery

Use documented historical or devotional images with clear alt text, caption,
source, and license. Never manufacture a saint's face. Where no responsible
image is available, use the saint's initials and Syriac name as a deliberately
symbolic monogram.

## Layout

Pages use wide margins, long vertical breaths, hairline separators, and
editorial rows. The homepage is a selection rather than the whole archive.
Dedicated collection pages hold complete content.

Research layers use open editorial rows, ruled indexes, and glossary tables
instead of generic resource cards. External scholarly gateways are visibly
named at the point of action so readers always know when they are leaving the
archive.

Large collections begin with a human category map, then reveal searchable
records in measured groups. Book covers function as documentary objects beside
editorial descriptions; manuscript images appear only when a holding repository
explicitly permits their reuse.

## Motion

The opening manuscript loader appears only once per application session.
Route changes use a short fade with a very small directional movement; the
persistent header does not animate. A three-pixel progress thread shows route
loading without blocking interaction. All motion collapses under reduced-motion
preferences.
