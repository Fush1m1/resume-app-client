export function Header() {
  return (
    <header className="text-center space-y-2 bg-[var(--header-bg)] border border-[var(--header-border)] rounded-2xl p-6 sm:p-8">
      <h1 className="font-bold tracking-tight text-[var(--header-text-main)] text-[clamp(1.875rem,5vw,3rem)] leading-tight">
        釈迦遺 Virtual Try-On
      </h1>
      <p className="text-[var(--header-text-secondary)]">
        Choose photos to generate image.
      </p>
    </header>
  );
}