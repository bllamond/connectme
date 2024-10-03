'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

// export async function savePageSettings(formData) {
//   mongoose.connect(process.env.MONGO_URI);
//   const session = await getServerSession(authOptions);

//   if (session) {
//     const displayName = formData.get('displayName');
//     const location = formData.get('location');
//     const bio = formData.get('bio');
//     const bgType = formData.get('bgType');
//     const bgColor = formData.get('bgColor');
//     await Page.updateOne(
//         {owner: session?.user?.email},
//         {displayName , location , bio , bgType , bgColor}
//     );

//     return true;
//   }

//   return false;
// }
export async function savePageSettings(formData) {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);

  if (session) {
    const dataKeys = [
      'displayName', 'location', 'bio', 'bgType', 'bgColor', 'bgImage',
    ];

    const dataToUpdate = {};

    // Iterate through the formData and check if each field exists
    for (const key of dataKeys) {
      if (formData.has(key)) {
        dataToUpdate[key] = formData.get(key);
      }
    }

    // Log to verify if bgImage is being included
    console.log('Data to Update:', dataToUpdate);

    await Page.updateOne(
      { owner: session?.user?.email },
      { $set: dataToUpdate }  // Use $set to ensure partial updates
    );

    if (formData.has('avatar')) {
      const avatarLink = formData.get('avatar');
      await User.updateOne(
        { email: session.user?.email },
        { $set: { image: avatarLink } }
      );
    }

    return true;
  }

  return false;
}



export async function savePageButtons(formData){
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions)
  if(session)
  {
    const buttonsValues = {};
    formData.forEach((value , key) => {
      buttonsValues[key] = value;
    });

    const dataToUpdate = {buttons: buttonsValues};
    await Page.updateOne(
      {owner: session?.user?.email},
      dataToUpdate,
    );

    return true;
  }
  return false;
}


export async function savePageLinks(links) {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    await Page.updateOne(
      {owner:session?.user?.email},
      {links},
    );
  } else {
    return false;
  }
}