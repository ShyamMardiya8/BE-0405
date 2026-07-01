import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import { companyService } from "@/app/src/Service/company.service";
import ResponseHandler from "@/app/src/utility/ResponseHandler";
import jwt from "jsonwebtoken";
import ApiErrorHandler from "@/app/src/utility/ApiErrorHandler";

export const GET = wrapHandler(async (req) => {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) {
    throw new ApiErrorHandler("Access token not found in cookies", 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    throw new ApiErrorHandler("Invalid or expired access token", 401);
  }

  const { companyId } = decoded;
  if (!companyId) {
    throw new ApiErrorHandler("No companyId associated with this token", 400);
  }

  const companyDetails = await companyService.getCompanyData(companyId);
  if (!companyDetails) {
    throw new ApiErrorHandler("Company not found", 404);
  }

  return NextResponse.json(
    new ResponseHandler("Company details retrieved successfully", 200, companyDetails, true),
    { status: 200 }
  );
});
