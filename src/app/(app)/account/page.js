import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Usernameform from "@/components/forms/Usernameform";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";

async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams.desiredUsername;
  if (!session) {
    redirect("/");
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({owner: session?.user?.email});
  if (page) {
    return (
      <PageSettingsForm page={page} user={session?.user}/>
    )
  }
  return (
    <div>
      <Usernameform desiredUsername = {desiredUsername}/>
    </div>
  );
}

export default AccountPage;
