"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const UploadImage = ({ onImageUpload }) => {
  const [publicId , setPublicId] = useState("")
  return (
    <>
    <CldUploadWidget uploadPreset="preset" onSuccess={({event , info}) => {
        if (event === "success") {
          setPublicId(info?.public_id);
          onImageUpload(info?.secure_url); 
        }

    }}>
      {({ open }) => (
        <button className="flex gap-2 text-gray-700 items-center cursor-pointer" onClick={() => open()}>
          Upload Image
        </button>
      )}
    </CldUploadWidget>
    </>
  );
};

export default UploadImage;
