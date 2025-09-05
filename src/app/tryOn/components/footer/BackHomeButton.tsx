import Link from "next/link";

type BackHomeButtonProps = {
  className?: string;
};

export function BackHomeButton({ className }: BackHomeButtonProps) {
  return (
    <Link
      href="/"
      className={className}
    >
      &larr; Back to Home
    </Link>
  );
}