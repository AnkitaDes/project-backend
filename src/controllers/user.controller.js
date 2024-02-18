import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation-not empty
  //check if user already exists: email, username
  //check for images, check for avatar
  //upload image to cloudinary
  //create user object-create entry in db
  //remove password and refresh tokens from the response
  //check for user creation
  //return response

  const { fullName, email, username, password } = req.body;
  console.log("email:", email);

  // if (fullName === "") {
  //   throw new ApiError(400, "FullName is required");
  // }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const exsistedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  console.log("exsistedUser:", exsistedUser);

  if (exsistedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0].path;
  console.log("req.files:", req.files);
  console.log("avatarLocalPath:", avatarLocalPath);

  const coverImageLocalPath = req.files?.coverImage[0].path;
  console.log("coverImageLocalPath:", coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User resistered successfully"));
});

export { registerUser };
