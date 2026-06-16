import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import viewService from "@/app/src/Service/view.service";
import auth from "@/app/src/Middleware/auth";
import ApiErrorHandler from "@/app/src/utility/ApiErrorHandler";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const dynamic = "force-dynamic";

export const GET = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const formId = searchParams.get("id");
  if (!formId) {
    throw new ApiErrorHandler("Form Id is missing", 400);
  }
  const fetchedForm = await viewService.fetchForm(formId);
  return NextResponse.json(
    new ResponseHandler("Form fetched successfully", 200, fetchedForm, true),
    { status: 200 },
  );
});
