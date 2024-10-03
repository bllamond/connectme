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
        <button className="bg-red-600 p-4 rounded-lg" onClick={() => open()}>
          Upload
        </button>
      )}
    </CldUploadWidget>
    </>
  );
};

export default UploadImage;
