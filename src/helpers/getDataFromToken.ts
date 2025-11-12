import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token =
      request.cookies.get("token")?.value ||
      request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      console.warn("No JWT token provided");
      return null;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

    return (decoded as any).id;
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);
    return null; 
  }
};
