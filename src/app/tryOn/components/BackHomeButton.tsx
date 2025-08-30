import Link from "next/link";

export function BackHomeButton() {
  return (
    <Link
      href="/"
      className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
    >
      &larr; Back to Home
    </Link>
  );
}