import Image from "next/image";
import { SectionWrapper } from "./SectionWrapper";

export type ResultViewProps = {
  resultImage: string | null;
};

export function ResultView({ resultImage }: ResultViewProps) {
  return (
    resultImage ? 
      <SectionWrapper>
        <div className="min-h-[320px] flex justify-center items-center">
          <div className="overflow-hidden rounded-lg shadow-lg bg-white p-1">
            <Image
              src={resultImage}
              alt="Generated try-on result"
              width={192}
              height={288}
              className="rounded-md"
            />
          </div>
        </div>
      </SectionWrapper>
      : <div></div>
  );
}