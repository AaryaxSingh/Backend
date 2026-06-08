import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password}=req.body
    console.log("email:", email);

    if ([fullName,email,username,password].some((field) => field?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }
/*.  this type of code line can be used to check for validation of single single filed
    if (fullName===""){
        throw new ApiError(400,"fullName is required")

    }
*/
    const existedUser = await User.findOne(
        {$or: [{ username },{ email }]}
    )

    if (existedUser){
        throw new ApiError(409,"user with this username and email already exist")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    let coverImageLocalPath;
    if(req.files && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar image is required")
    }

    //console.log(req.files)

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null

    if(!avatar){
        throw new ApiError(400,"avatar is required")
    }

    const user = await User.create({
        fullname: fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"error while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )


});

export { registerUser };
