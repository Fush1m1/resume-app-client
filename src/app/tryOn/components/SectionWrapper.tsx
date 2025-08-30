import React from "react";

export function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[var(--header-bg)] border border-[var(--header-border)] rounded-2xl p-6 sm:p-8">
      {children}
    </section>
  );
}