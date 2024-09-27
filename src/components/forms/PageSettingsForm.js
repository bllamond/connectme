"use client";
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import RadioTogglers from "../formItems/radioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  

  async function baseFormSettings(formData) {
    console.log(formData.get("displayName"));
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved!");
    }
  }

  // function handleFileChange(e){
  //     const file = e.target.files?.[0];
  //     if(file)
  //     {
  //       const data = new FormData;
  //       data.set('file' , file);
  //       fetch('/api/upload' , {
  //         method: 'POST',
  //         body: data,
  //       }).then(response => {
  //         response.json().then(link => {
  //           console.log(link);
  //         });
  //       })
  //     }
  // }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
  
    if (file) {
      const data = new FormData();
      data.append('file', file);
  
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          console.log('Uploaded image URL:', result.url);
        })
        .catch((error) => {
          console.error('Error during file upload:', error);
        });
    }
  }
  
  return (
    <div className="-m-4">
      <form action={baseFormSettings}>
        <div
          className="bg-gray-300 py-16 flex justify-center items-center"
          style={{ backgroundColor: bgColor }}
        >
          <div>
            <RadioTogglers
              defaultValue={page.bgType}
              selected="color"
              options={[
                { value: "color", icon: faPalette, label: "Color" },
                { value: "image", icon: faImage, label: "Image" },
              ]}
              onChange={(val) => setBgType(val)}
            />
            {bgType === "color" && (
              <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                <div className="gap-2 flex justify-center">
                  <span>Background color: </span>
                  <input
                    type="color"
                    name="bgColor"
                    onChange={(ev) => setBgColor(ev.target.value)}
                    defaultValue={page.bgColor}
                  />
                </div>
              </div>
            )}
            {bgType === "image" && (
              <div className="flex justify-center">
                <label type="button" className="bg-white shadow px-4 py-2 mt-2">
                  <input className="hidden" onChange={handleFileChange} type="file" />
                  Change image
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center -mb-8">
          <Image
            className="rounded-full relative -top-8 border-4 border-white shadow shadow-black/50"
            src={user?.image}
            alt={"avatar"}
            width={128}
            height={128}
          />
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">
            Display name
          </label>
          <input
            className="inputForm"
            type="text"
            id="nameIn"
            name="displayName"
            defaultValue={page.displayName}
            placeholder="Vinay Malik"
          />
          <label className="input-label" htmlFor="locationIn">
            Location
          </label>
          <input
            className="inputForm"
            type="text"
            id="locationIn"
            name="location"
            defaultValue={page.location}
            placeholder="Somewhere in the world..."
          />
          <label className="input-label" htmlFor="bioIn">
            Bio
          </label>
          <textarea
            name="bio"
            id="bioIn"
            defaultValue={page.bio}
            placeholder="Your bio goes here... "
          />
          <div className="max-w-[200px] mx-auto ">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} className={"w-6 h-6"} />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
