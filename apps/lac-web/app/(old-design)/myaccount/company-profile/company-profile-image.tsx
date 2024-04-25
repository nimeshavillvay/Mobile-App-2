"use client";

import { Button } from "@/(old-design)/_components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import defaultAvatar from "../default-avatar.png";
import ImageUploadDialog from "./image-upload-dialog";

const CompanyProfileImage = ({ token }: { token: string }) => {
  const [openImageUploadDialog, setOpenImageUploadDialog] = useState(false);

  return (
    <>
      <div className="flex flex-row">
        <div className="relative">
          <Image
            src={defaultAvatar}
            alt="A picture of the default avatar"
            width={117}
            height={117}
          />

          <Button
            className="absolute bottom-0 right-0 bg-brand-secondary p-1 text-white"
            aria-label="Edit profile picture"
            onClick={() => setOpenImageUploadDialog(true)}
          >
            <MdOutlineModeEdit />
          </Button>
        </div>
      </div>

      <ImageUploadDialog
        open={openImageUploadDialog}
        setOpenImageUploadDialog={setOpenImageUploadDialog}
        maxFileSize={5242880}
        maxFileSizeErrorMsg={"Maximum file size is 5MB."}
        acceptableImageTypes={["image/png", "image/jpg", "image/jpeg"]}
        acceptableImageTypesErrorMsg={
          "Invalid file type. Only JPG, JPEG and PNG types are accepted."
        }
      />
    </>
  );
};

export default CompanyProfileImage;
