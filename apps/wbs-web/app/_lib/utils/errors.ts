type ErrorResponse = {
  status_code: string | undefined;
  message: string;
};

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  if (
    typeof error === "object" &&
    (typeof (error as ErrorResponse)?.status_code === "string" ||
      typeof (error as ErrorResponse)?.status_code === "undefined") &&
    typeof (error as ErrorResponse)?.message === "string"
  ) {
    return true;
  }

  return false;
};
