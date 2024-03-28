import { ChevronDownIcon, Heading3 } from "@danklabs/pattern-library/core";
import { RenderContent } from "./RenderContent";

export function FAQ({
  value,
  isInline,
}: {
  value: {
    questions: Array<{
      question: string;
      answer: any;
    }>;
  };
  isInline: boolean;
}) {
  return (
    <div>
      {value.questions.map((qa, idx) => (
        <Item idx={idx} key={idx} question={qa.question} answer={qa.answer} />
      ))}
    </div>
  );
}

function Item({
  idx,
  question,
  answer,
}: {
  idx: number;
  question: string;
  answer: any[];
}) {
  return (
    <div>
      <div
        data-collapse-toggle={`faq-${idx}`}
        className="group py-3 mx-2 md:py-5 md:px-4 flex flex-row items-center border-b border-black/10 cursor-pointer"
      >
        <Heading3 className="group-aria-expanded:text-secondary grow">
          {question}
        </Heading3>
        <ChevronDownIcon className="ml-auto group-aria-expanded:rotate-180" />
      </div>
      <div
        id={`faq-${idx}`}
        className="hidden border-b border-black/10 p-3 md:p-6"
      >
        <RenderContent blocks={answer} />
      </div>
    </div>
  );
}
