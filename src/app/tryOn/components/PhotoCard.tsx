import Image from "next/image";

type PhotoCardProps = {
  id: string;
  src: string;
  alt: string;
  selected: boolean;
  onSelect: () => void;
  disabled: boolean;
};

export function PhotoCard({ id, src, alt, selected, onSelect, disabled }: PhotoCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSelect();
  };

  const baseClasses = "rounded-xl shadow-lg overflow-hidden ring-offset-4 ring-offset-gray-50 transition-all duration-200 focus:outline-none";
  const conditionalClasses = [
    disabled ? "opacity-60 cursor-not-allowed" : "active:scale-95",
    selected
      ? "ring-5 ring-blue-500"
      : "ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-400",
  ].join(" ");

  return (
    <button
      key={id}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${conditionalClasses}`}
    >
      <Image
        src={src}
        alt={alt}
        width={192}
        height={288}
        className="bg-white h-[288px] w-[192px] object-cover"
      />
    </button>
  );
}