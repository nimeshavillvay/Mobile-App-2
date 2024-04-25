import { Button } from "@/(old-design)/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";
import fileUpload from "../upload_icon.svg";
import useUpdateCompanyProfileImageMutation from "./use-update-company-profile-image-mutation.hook";

type ImageUploadDialogProps = {
  openDialog: boolean;
  setOpenImageUploadDialog: Dispatch<SetStateAction<boolean>>;
  maxFileSize: number;
  maxFileSizeErrorMsg: string;
  acceptableImageTypes: string[];
  acceptableImageTypesErrorMsg: string;
};

const ImageUploadDialog = ({
  openDialog,
  setOpenImageUploadDialog,
  maxFileSize,
  maxFileSizeErrorMsg,
  acceptableImageTypes,
  acceptableImageTypesErrorMsg,
}: ImageUploadDialogProps) => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  let errorMsg = "";
  let fileAccepted = false;

  const files = acceptedFiles.map((file: File) => {
    if (!acceptableImageTypes.includes(file.type)) {
      errorMsg = acceptableImageTypesErrorMsg;
    } else if (file.size > maxFileSize) {
      errorMsg = maxFileSizeErrorMsg;
    } else {
      fileAccepted = true;
      return (
        <li key={file.name} className="text-sm font-medium text-gray-500">
          {file.name}
        </li>
      );
    }
  });

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
              <Image className="mx-auto" src={fileUpload} alt="" />
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
            <div className="text-center">
              <Button onClick={open}>Choose File</Button>
              <ul>{files}</ul>
              {fileAccepted && (
                <Button onClick={submitImage}>Upload Image</Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
