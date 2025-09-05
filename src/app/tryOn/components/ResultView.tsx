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
          <div className="rounded-xl shadow-lg overflow-hidden ring-offset-4 ring-offset-gray-50 ring-1 ring-gray-300">
            <Image
              src={resultImage}
              alt="Generated try-on result"
              width={192}
              height={288}
              className="bg-white h-[288px] w-[192px] object-cover"
            />
          </div>
        </div>
      </SectionWrapper>
      : <div></div>
  );
}