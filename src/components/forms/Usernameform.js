"use client";
import grabUsername from "@/actions/grabUsername";
import React, { useState } from "react";
import RightIcon from "../icons/RightIcon";
import UsernameFormResults from "../formResults/usernameFormResults";
import { redirect, useRouter } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";

const Usernameform = ({ desiredUsername }) => {
  const [taken, setTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData) {
    setIsLoading(true);

    const result = await grabUsername(formData);

    setIsLoading(false);
    setTaken(result === false);

    if (result) {
      redirect("/account?created=" + formData.get("username"));
    }
  }
  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">Enter username</h1>
      <p className="text-center mb-6 text-gray-500">Choose your username</p>
      <div className="max-w-xs mx-auto">
        <input
          name="username"
          className="block p-2 mb-2 text-center mx-auto border w-full"
          type="text"
          defaultValue={desiredUsername}
          placeholder="username"
        />
        {taken && (
          <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
            The username is taken
          </div>
        )}
        <SubmitButton>
          <span>Claim your username</span>
          <RightIcon />
        </SubmitButton>
      </div>
    </form>
  );
};

export default Usernameform;
