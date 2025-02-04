import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import LogoutButton from "./buttons/LogoutButton";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white border-b p-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex gap-6 items-center">
          <Link href={"/"}>ConnectMe</Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Pricing</Link>
            <Link href={"/"}>Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          {session && (
            <>
            <Link href={'/account'}> Hello, {session?.user?.name}</Link>
            <LogoutButton/>
            </>
            )
            }
          {!session && (
            <>
              <Link href={"/login"}>Login / Create Account</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
