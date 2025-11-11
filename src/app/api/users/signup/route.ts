// import {connectDB} from '@/dbConfig/dbConfig'
// import User from '@/models/userModel'
// import { NextRequest,NextResponse } from 'next/server'
// import bcryptjs from 'bcryptjs';
// import { sendEmail } from '@/helpers/mailer';

// connectDB()

// export async function POST(request:NextRequest){
//     try {
//        const reqBody= await request.json()
//        const {username,email,password}=reqBody;
//        // validation
//        console.log(reqBody);

//        const user=await User.findOne({email})
//        if(user){
//         return NextResponse.json({error:"User already exist"},{status:400})
//        }
//         //hash password
//         const salt = await bcryptjs.genSalt(10)
//         const hashedPassword=await bcryptjs.hash(password,salt);

//         const newUser=new User({
//             username,
//             email,
//             password:hashedPassword
//         })
//         const savedUser=await newUser.save();
//         console.log(savedUser);
        
//         //send verification mail
//         await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});
//         return NextResponse.json({
//             message:"User registered successfully",
//             success:true,
//             savedUser
//         })

//     } catch (error:any) {
//         return NextResponse.json({error:error.message},{status:500})
//     }
// }


import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log("Request body:", reqBody);

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log("User registered:", savedUser._id);

    // Return success response
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (error: any) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
