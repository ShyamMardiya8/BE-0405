import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import { authService } from "@/app/src/Service/auth.service";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  const { email, password } = await req.json();

  const user = await authService.login(email, password);

  const response = NextResponse.json(
    new ResponseHandler(
      "User login successfully",
      200,
      {
        user: user.user,
      },
      true
    ),
    { status: 200 }
  );

  // Access Token
  response.cookies.set("accessToken", user.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  // Refresh Token
  response.cookies.set("refreshToken", user.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
});