import { Button } from "@repo/web-ui/components/ui/button";
import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from "react";

type StepState = "open" | "closed";

const StepContext = createContext<{
  state: StepState;
  title: string;
}>({
  state: "open",
  title: "",
});

const useStepContext = () => {
  return useContext(StepContext);
};

type StepContainerProps = {
  title: string;
  children: ReactNode;
  state: StepState;
};

export const StepContainer = ({
  title,
  children,
  state = "open",
}: StepContainerProps) => {
  return (
    <StepContext.Provider
      value={{
        state,
        title,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const StepContainerOpen = ({
  children,
  steps,
  submitBtnText = "Continue",
  allFieldsRequired = false,
  onSubmit,
}: {
  children: ReactNode;
  steps: {
    current: number;
    total: number;
  };
  submitBtnText?: string;
  allFieldsRequired?: boolean;
  onSubmit?: ComponentProps<"form">["onSubmit"];
}) => {
  const { state, title } = useStepContext();

  if (state === "closed") {
    return null;
  }

  return (
    <form
      className="flex flex-col gap-5 rounded-lg border border-wurth-gray-250 p-6 shadow-lg"
      onSubmit={onSubmit}
    >
      <div className="flex flex-row items-start justify-between">
        <h3 className="text-base font-semibold text-wurth-gray-800">{title}</h3>

        <div className="text-sm text-wurth-gray-500">
          {steps.current} of {steps.total} steps
        </div>
      </div>

      {children}

      <div className="flex flex-row-reverse items-center justify-between pt-1">
        <Button
          type="submit"
          className="h-fit min-w-[7.5rem] py-2.5 font-bold shadow-md"
        >
          {submitBtnText}
        </Button>

        {allFieldsRequired && (
          <div className="text-xs text-wurth-gray-500">
            *All fields are required
          </div>
        )}
      </div>
    </form>
  );
};

export const StepContainerClosed = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: ComponentProps<typeof Button>["onClick"];
}) => {
  const { state, title } = useStepContext();

  if (state === "open") {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-wurth-gray-250 p-6 shadow-lg">
      <div className="flex flex-row items-start justify-between">
        <h3 className="text-base font-semibold text-wurth-gray-800">{title}</h3>

        <Button variant="subtle" className="font-bold" onClick={onClick}>
          Edit
        </Button>
      </div>

      {children}
    </section>
  );
};
