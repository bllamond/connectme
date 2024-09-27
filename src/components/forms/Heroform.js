"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Heroform = ({ user }) => {

   
  const router = useRouter();
  useEffect(() => { 
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);
  // const [username , setUsername] = useState('')
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log({username});
    const form = e.target;
    const input = form.querySelector("input");
    const username = input.value;

    if (username.length > 0) {
      if (user) {
        router.push("/account?desiredUsername="+username);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg shadow-gray-700/20"
    >
      <span className="bg-white py-4 pl-4">connectme.to/</span>
      <input type="text" className="py-4" placeholder="username" />
      <button type="submit" className="bg-blue-500 text-white py-4 px-6">
        Join for Free
      </button>
    </form>
  );
};

export default Heroform;
