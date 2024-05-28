import * as XLSX from "xlsx";

export const validateFile = (file: File) => {
  const maxFileSize = 1000000; // 1MB
  const maxFileSizeErrorMsg = "Maximum file size is 1MB.";
  const acceptableImageTypesErrorMsg =
    "Invalid file format. Only EXCEL and CSV are supported.";

  let errorMsg = "";
  const extension = file.name.split(".")[1];

  if (extension !== "xlsx" && extension !== "xls" && extension !== "csv") {
    errorMsg = acceptableImageTypesErrorMsg;
  }

  if (file.size > maxFileSize) {
    errorMsg = maxFileSizeErrorMsg;
  }

  return errorMsg ? errorMsg : false;
};

export const getExcelData = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();

  const workbook = XLSX.read(fileBuffer);

  const firstSheetName = workbook.SheetNames[0] || "Sheet1";

  const worksheet = workbook.Sheets[firstSheetName] || {};

  const csvData = XLSX.utils.sheet_to_csv(worksheet) as string;
  const rowData = csvData.split("\n");

  return rowData
    .map((row) => {
      const cells = row.split(",").map((cell) => cell.trim());
      if (cells[0] !== "" && cells[0] !== null) {
        return cells;
      }
      return null;
    })
    .filter((row) => row !== null);
};
