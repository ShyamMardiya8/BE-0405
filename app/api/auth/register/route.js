import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import { authService } from "@/src/Service/auth.service";
import { validateBody, authValidation } from "@/src/utility/Validators";
import ResponseHandler from "@/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  const body = await req.json();
  const validatedData = validateBody(body, authValidation);
  const user = await authService.register(validatedData);
  return NextResponse.json(new ResponseHandler("User register successfully", 200, user, true), { status: 201 });
});
