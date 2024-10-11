import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {

    //get user detail from frontend
    //validataion -not empty
    //check if user is already exixt:username ,email
    //check for images check for avtar
    //uplod them to cloudnary:avtar
    //create user object :create entry in db
    //remove password and refresh token field from response

    // firsth step 
    const { fullName, username, email, password } = req.body
    console.log(email);
    // if (fullName==="") {
    //     throw new ApiError(400,"fullName is required")
    // }
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const exitedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (exitedUser) {
        throw new ApiError(409, "user with username or email already exist")
    }

    const avtarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avtarLocalPath) {
        throw new ApiError(400, "Avtar file is required")
    }

    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avtar file is required")
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, password,
        username: username.toLowerCase()
    })
 const createdUser = await User.findById(user._id).select(
    " -password -refreshToken"
 )
 if (!createdUser) {
    throw new ApiError("something went wronge while regestering the user")
 }
 return res.status(201).json(
    new ApiResponse(200,createdUser,"user regestered successfully")
 )
})
export { registerUser }