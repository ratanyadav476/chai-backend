import { v2 as cloudenary } from "cloudenary"
import fs from "fs"
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image
const uploadOnCloudnary = async (localFilePath) => {
    try {

        if (!LocalFilePath) return null
        //uplaoad the file on cloudnary
        const response = await cloudenary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has uploaded successfully
        console.log("file is uploaded on cloudnary", response.url);
        return response


    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locially saved temporary file as the upload operation got failed
        return null

    }
}


export { uploadOnCloudnary }
