import Link from "next/link";

type AuthorProps = {
  className?: string;
};

export function Author({ className }: AuthorProps) {
  return (
    <Link
      href="https://github.com/Fush1m1"
      className={className}
    >
      Made by Fush1m1
    </Link>
  );
}