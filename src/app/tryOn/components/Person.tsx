import { PhotoCard } from "./PhotoCard";
import { SectionWrapper } from "./SectionWrapper";

type SelectPersonProps = {
  selected: string | null;
  onSelect: (value: string | null) => void;
  disabled: boolean;
  userImageUrl?: string | null;
  handlePersonImageUpload: (value: string | null) => void;
};
export function Person({
  selected,
  onSelect,
  disabled,
  userImageUrl,
  handlePersonImageUpload,
}: SelectPersonProps) {
  const persons = [
    { id: "person1", src: "/png/person1.png", alt: "Person 1" },
    { id: "person2", src: "/png/person2.png", alt: "Person 2" },
  ];

  return (
    <SectionWrapper handlePersonImageUpload={handlePersonImageUpload} disabled={disabled}>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {userImageUrl && (
          <PhotoCard
            key={userImageUrl}
            id={userImageUrl}
            src={userImageUrl}
            alt="Your Uploaded Photo"
            selected={selected === userImageUrl}
            onSelect={() =>
              onSelect(selected === userImageUrl ? null : userImageUrl)
            }
            disabled={disabled}
          />
        )}
        {persons.map((p) => (
          <PhotoCard
            key={p.id}
            id={p.id}
            src={p.src}
            alt={p.alt}
            selected={selected === p.id}
            onSelect={() => onSelect(selected === p.id ? null : p.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
