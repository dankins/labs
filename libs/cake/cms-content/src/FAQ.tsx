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
      {value.questions.map((qa) => (
        <Item key={qa.question} question={qa.question} answer={qa.answer} />
      ))}
    </div>
  );
}

function Item({ question, answer }: { question: string; answer: any[] }) {
  return (
    <div>
      <h1 className="text-xl font-medium">{question}</h1>
      <RenderContent blocks={answer} />
    </div>
  );
}
