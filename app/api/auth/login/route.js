import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import { authService } from "@/src/Service/auth.service";
import ResponseHandler from "@/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  const { email, password } = await req.json();
  const user = await authService.login(email, password);
  const response = {
    user: user.user,
    token: user.token,
    refreshToken: user.refreshToken,
  };
  return NextResponse.json(new ResponseHandler("User login successfully", 200, response, true), { status: 200 });
});
