"use client";

import { Button } from "@/(old-design)/_components/ui/button";
import {
  ImageLoader,
  ImageLoaderProps,
} from "next/dist/client/image-component";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import defaultAvatar from "../default-avatar.png";
import ImageUploadDialog from "./image-upload-dialog";
import { CompanyDetails } from "./types";
import useSuspenseCompanyProfileDetails from "./use-suspense-company-profile-details.hook";

const CompanyProfileImage = ({ token }: { token: string }) => {
  const [openImageUploadDialog, setOpenImageUploadDialog] = useState(false);

  const companyDetailsQuery = useSuspenseCompanyProfileDetails(token);
  const companyDetails: CompanyDetails = companyDetailsQuery?.data;

  const imageSrc = companyDetails?.image ? companyDetails.image : defaultAvatar;

  return (
    <>
      <div className="flex flex-row">
        <div className="relative mb-5 mr-10">
          <Image
            loader={() => `${imageSrc}`}
            src={imageSrc}
            alt="company profile image"
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

        <div className="relative">
          <h3 className="font-title text-xl font-bold text-gray-500">
            {companyDetails?.companyName}
          </h3>
        </div>
      </div>

      <ImageUploadDialog
        openDialog={openImageUploadDialog}
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
