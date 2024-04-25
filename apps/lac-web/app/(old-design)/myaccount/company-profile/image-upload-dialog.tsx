import { Button } from "@/(old-design)/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import fileUpload from "../upload_icon.svg";

type ImageUploadDialogProps = {
  open: boolean;
  setOpenImageUploadDialog: Dispatch<SetStateAction<boolean>>;
  maxFileSize: number;
  maxFileSizeErrorMsg: string;
  acceptableImageTypes: string[];
  acceptableImageTypesErrorMsg: string;
};

const ImageUploadDialog = ({
  open,
  setOpenImageUploadDialog,
  maxFileSize,
  maxFileSizeErrorMsg,
  acceptableImageTypes,
  acceptableImageTypesErrorMsg,
}: ImageUploadDialogProps) => {
  const [image, setImage] = useState({} as File);

  const [errorMsg, setErrorMsg] = useState("");

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const file = e.target.files ? e.target.files[0] : null;
    console.log(file);
    if (!file) {
      return;
    }

    if (!acceptableImageTypes.includes(file.type)) {
      setErrorMsg(acceptableImageTypesErrorMsg);
      setImage({} as File);
      return;
    } else if (file.size > maxFileSize) {
      setErrorMsg(maxFileSizeErrorMsg);
      setImage({} as File);
      return;
    }

    setImage(file);
  };

  const submitImage = async () => {};

  return (
    <Dialog open={open} onOpenChange={setOpenImageUploadDialog}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>

        <div className="p-10">
          {errorMsg.length > 0 && <p>{errorMsg} </p>}
          <div className="mb-10">
            <Image className="mx-auto" src={fileUpload} alt="" />
          </div>
          <div className="text-center">
            <p className="text-base font-medium text-gray-500">
              Maximum file size 5MB and allowed file types are jpg, jpeg, png
            </p>
          </div>
          <div className="text-center">
            <p className="text-base font-medium text-gray-500">
              Please upload 1:1 square images (eg. 100px * 100px)
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-black">
              Drag file to upload,
              <br /> or
            </p>
          </div>

          <div>
            <label htmlFor="companyProfileUpload">Choose File</label>
            <input
              className=" choose-file-btn appearance-none"
              type="file"
              name="image"
              id="companyProfileUpload"
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleImageUpload}
            />
          </div>

          <Button
            variant="ghost"
            title="Upload Image"
            className="btn red-btn"
            onClick={submitImage}
          >
            <input
              type="file"
              name="image"
              id="companyProfileUpload"
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleImageUpload}
            />
          </Button>

          <div>{image && image.name}</div>
          {image.name && (
            <button
              title="Upload Image"
              className="btn red-btn"
              onClick={submitImage}
            >
              Upload Image
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
