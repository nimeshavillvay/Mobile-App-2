import { cn } from "@/_lib/utils";
import { Button } from "@repo/web-ui/components/base/atoms/button";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { CheckCircleFilled } from "@repo/web-ui/components/icons/check-circle-filled";

type RegisterQuestionProps = {
  readonly question: string;
  readonly options: readonly string[];
  readonly selectedOption: string | undefined;
  readonly onOptionSelect: (option: string) => void;
  readonly testIdPrefix?: string;
};

const RegisterQuestion = ({
  question,
  options,
  selectedOption,
  onOptionSelect,
  testIdPrefix = "existing-customer-question",
}: RegisterQuestionProps) => {
  return (
    <section className="space-y-4 rounded-lg bg-wurth-gray-50 p-6">
      <h2
        className="text-center text-base font-semibold text-black"
        data-testid={`${testIdPrefix}-heading`}
      >
        {question}
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-3 xs:flex-row">
        {options.map((value) => (
          <Button
            key={value}
            variant="ghost"
            className={cn(
              "h-fit flex-1 gap-2 rounded-lg border-2 border-wurth-gray-150 bg-white p-4 font-bold text-wurth-gray-800 md:min-w-[7.5rem] md:flex-none",
              value === selectedOption && "border-black",
            )}
            data-testid={`${testIdPrefix}-btn-${value.trim().toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => onOptionSelect(value)}
          >
            {value === selectedOption ? (
              <CheckCircleFilled
                className="size-5"
                data-testid={`${testIdPrefix}-icon-check-circle-filled`}
              />
            ) : (
              <CheckCircle
                className="size-5 stroke-wurth-gray-150"
                data-testid={`${testIdPrefix}-icon-check-circle`}
              />
            )}

            <span>{value}</span>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default RegisterQuestion;
