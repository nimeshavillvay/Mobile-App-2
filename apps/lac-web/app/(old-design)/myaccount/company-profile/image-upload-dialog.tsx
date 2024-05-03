import { Button } from "@/(old-design)/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import fileUpload from "../upload_icon.svg";
import useUpdateCompanyProfileImageMutation from "./use-update-company-profile-image-mutation.hook";

type ImageUploadDialogProps = {
  openDialog: boolean;
  setOpenImageUploadDialog: (state: boolean) => void;
};

//  TODO: remove type, size and messages
const ImageUploadDialog = ({
  openDialog,
  setOpenImageUploadDialog,
}: ImageUploadDialogProps) => {
  const maxFileSize = 5242880;
  const maxFileSizeErrorMsg = "Maximum file size is 5MB.";
  const acceptableImageTypes = ["image/png", "image/jpg", "image/jpeg"];
  const acceptableImageTypesErrorMsg =
    "Invalid file type. Only JPG, JPEG and PNG types are accepted.";

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  let errorMsg = "";
  if (!acceptedFiles.find((file) => acceptableImageTypes.includes(file.type))) {
    errorMsg = acceptableImageTypesErrorMsg;
  } else if (acceptedFiles.find((file) => file.size > maxFileSize)) {
    errorMsg = maxFileSizeErrorMsg;
  }

  const files = acceptedFiles.filter(
    (file) =>
      acceptableImageTypes.includes(file.type) && file.size <= maxFileSize,
  );

  const updateCompanyProfileImageMutation =
    useUpdateCompanyProfileImageMutation();

  const submitImage = () => {
    const formData = new FormData();
    formData.append("File", acceptedFiles[0] as File);

    updateCompanyProfileImageMutation.mutate(formData, {
      onSuccess: () => {
        setOpenImageUploadDialog(false);
      },
      onError: () => {
        errorMsg = "File upload error";
      },
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenImageUploadDialog}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>

        <div className="px-5 pb-7 pt-3">
          {errorMsg.length > 0 && (
            <div className="border-1 mb-7 border border-red-500 p-2 text-red-500">
              <p>{errorMsg} </p>
            </div>
          )}
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className="mb-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="146"
                height="146"
                fill="none"
                viewBox="0 0 146 146"
              >
                <path
                  fill="#C00"
                  d="M105.85 66.173C102.903 51.223 89.773 40 74 40c-12.523 0-23.4 7.107-28.817 17.507C32.14 58.893 22 69.943 22 83.333c0 14.344 11.657 26 26 26h56.333c11.96 0 21.667-9.706 21.667-21.666 0-11.44-8.883-20.714-20.15-21.494zm-1.517 34.494H48c-9.577 0-17.333-7.757-17.333-17.334 0-8.883 6.63-16.293 15.426-17.203l4.637-.477 2.167-4.116c4.116-7.93 12.176-12.87 21.103-12.87 11.353 0 21.147 8.06 23.357 19.196l1.3 6.5 6.63.477c6.76.433 12.046 6.11 12.046 12.827 0 7.15-5.85 13-13 13zM56.667 79h11.05v13h12.566V79h11.05L74 61.667 56.667 79z"
                ></path>
                <path
                  stroke="#C00"
                  d="M73 145c39.765 0 72-32.235 72-72 0-39.764-32.235-72-72-72C33.236 1 1 33.236 1 73c0 39.765 32.236 72 72 72z"
                ></path>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">
                Maximum file size 5MB and allowed file types are jpg, jpeg, png
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">
                Please upload 1:1 square images (eg. 100px * 100px)
              </p>
            </div>
            <div className="p-2 text-center">
              <p className="text-xs font-semibold text-black">
                Drag file to upload,
                <br /> or
              </p>
            </div>
            {/* TODO: remove all unnecessary divs here */}
            <div className="text-center">
              <Button onClick={open}>
                <span className="sr-only">Upload profile image</span>Choose File
              </Button>

              <ul>
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="text-sm font-medium text-gray-500"
                  >
                    {file.name}
                  </li>
                ))}
              </ul>

              {files.length > 0 && (
                <Button onClick={submitImage}>
                  <span className="sr-only">Submit profile image</span>Upload
                  Image
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
