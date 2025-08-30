import React from "react";

export function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-purple-200 border border-purple-300 rounded-2xl p-6 sm:p-8">
      {children}
    </section>
  );
}