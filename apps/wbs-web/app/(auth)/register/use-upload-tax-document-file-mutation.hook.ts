import { api } from "@/_lib/api";
import { useMutation } from "@tanstack/react-query";

type SuccessResponse = {
  status_code: "OK";
  type: string;
  id: number;
};

type ErrorResponse = {
  status_code: string;
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

type TaxDocumentUpload = {
  userId: number;
  cert1: string;
  cert2: FormData;
};

const useUploadTaxDocumentMutation = () => {
  return useMutation<SuccessResponse, Error, TaxDocumentUpload[]>({
    mutationFn: async (
      taxDocuments: TaxDocumentUpload[],
    ): Promise<SuccessResponse> => {
      const response = await api.post("rest/register/upload-tax-cert", {
        body: JSON.stringify(taxDocuments),
      });

      const data: ApiResponse = await response.json();

      if (isSuccessResponse(data)) {
        return data;
      } else {
        throw new Error(
          data.message || "Upload failed: Unexpected response format",
        );
      }
    },
  });
};

function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  return (
    response.status_code === "OK" &&
    "type" in response &&
    "id" in response &&
    typeof response.type === "string" &&
    typeof response.id === "number"
  );
}

export default useUploadTaxDocumentMutation;
