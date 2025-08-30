import Image from "next/image";
import { SectionWrapper } from "./SectionWrapper";

export type ResultViewProps = {
  loading: boolean;
  error: string | null;
  resultImage: string | null;
};

export function ResultView({ loading, error, resultImage }: ResultViewProps) {
  return (
    <SectionWrapper>
      <div className="min-h-[320px] flex justify-center items-center">
        {!resultImage && !loading && !error && (
          <div className="text-center">
            <p className="text-[var(--header-text-secondary)]">Your result will appear here.</p>
          </div>
        )}
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--spinner-color)] mx-auto"></div>
            <p className="text-[var(--header-text-secondary)] mt-4">Please wait a moment.</p>
          </div>
        )}
        {error && (
          <div className="text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}
        {resultImage && (
          <div className="overflow-hidden rounded-lg shadow-lg bg-white p-1">
            <Image
              src={resultImage}
              alt="Generated try-on result"
              width={192}
              height={288}
              className="rounded-md"
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}