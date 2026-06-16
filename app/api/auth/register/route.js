import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import { authService } from "@/app/src/Service/auth.service";
import { validateBody, authValidation } from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  const body = await req.json();
  const validatedData = validateBody(body, authValidation);
  const user = await authService.register(validatedData);
  return NextResponse.json(
    new ResponseHandler("User register successfully", 200, user, true),
    { status: 201 },
  );
});
