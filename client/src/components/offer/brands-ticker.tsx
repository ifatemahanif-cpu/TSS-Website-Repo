const BRANDS = [
  "Art Fervour",
  "LBB",
  "Headout",
  "SOCIAL",
  "Singapore Tourism Board",
  "Coca-Cola",
  "Cadbury's",
  "Heinz",
  "Google Pixel",
];

function Track() {
  return (
    <div aria-hidden className="flex shrink-0 items-center">
      {BRANDS.map((brand) => (
        <span key={brand} className="flex items-center">
          {/* Hovering already pauses the strip; brightening the names is the
              reward for stopping on one. */}
          <span className="o-brand whitespace-nowrap font-display text-[17px] text-white/35 sm:text-xl">
            {brand}
          </span>
          <span className="mx-6 h-1 w-1 rounded-full bg-magenta-lift/50 sm:mx-9" />
        </span>
      ))}
    </div>
  );
}

export function BrandsTicker() {
  return (
    <div className="marquee relative overflow-hidden py-1">
      <div className="marquee-track">
        <Track />
        <Track />
      </div>
      {/* Fades the ends into the band so the loop point never shows. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy to-transparent sm:w-28" />
      <p className="sr-only">
        Brands we have worked with: {BRANDS.join(", ")}.
      </p>
    </div>
  );
}
