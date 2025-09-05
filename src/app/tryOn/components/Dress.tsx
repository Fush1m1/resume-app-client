import { PhotoCard } from "./PhotoCard";
import { SectionWrapper } from "./SectionWrapper";

type SelectDressProps = {
  selected: string | null;
  onSelect: (value: string | null) => void;
  disabled: boolean;
  userImageUrl?: string | null;
};

export function Dress({ selected, onSelect, disabled }: SelectDressProps) {
  const dresses = [
    { id: "dress1", src: "/png/dress1.png", alt: "Dress 1" },
    { id: "dress2", src: "/png/dress2.png", alt: "Dress 2" },
    { id: "dress3", src: "/png/dress3.png", alt: "Dress 3" },
  ];

  return (
    <SectionWrapper>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {dresses.map((d) => (
          <PhotoCard
            key={d.id}
            id={d.id}
            src={d.src}
            alt={d.alt}
            selected={selected === d.id}
            onSelect={() => onSelect(selected === d.id ? null : d.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
