// import { v2 as cloudinary } from 'cloudinary';
// import { NextResponse } from 'next/server';
// import formidable from 'formidable';


// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
// });

// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };

// export async function POST(req) {
//   return new Promise((resolve, reject) => {
//     const form = new formidable.IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form data:', err);
//         return reject(
//           NextResponse.json({ error: 'Error parsing the file' }, { status: 500 })
//         );
//       }

//       try {
//         const file = files.file;

//         const uploadResult = await cloudinary.uploader.upload(file.filepath, {
//           folder: 'uploads',
//           resource_type: 'image',
//         });

//         resolve(
//           NextResponse.json({ url: uploadResult.secure_url }, { status: 200 })
//         );
//       } catch (uploadError) {
//         resolve(
//           NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 })
//         );
//       }
//     });
//   });
// }
