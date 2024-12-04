import { v2 as cloudnary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudnary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudnary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudnary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

export const delteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudnary.uplpoader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};
