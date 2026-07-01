import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import { companyService } from "@/app/src/Service/company.service";
import { validateBody, companyOnboardValidation } from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  const body = await req.json();
  const validatedData = validateBody(body, companyOnboardValidation);
  const result = await companyService.onboard(validatedData);
  return NextResponse.json(
    new ResponseHandler("Company onboarded successfully with Super Admin", 201, result, true),
    { status: 201 }
  );
});
