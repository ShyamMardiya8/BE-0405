import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import viewService from "@/app/src/Service/view.service";
import auth from "@/app/src/Middleware/auth";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  await auth(req);
  const formBody = await req.json();
  const fetchedForm = await viewService.submitForm(formBody);
  return NextResponse.json(
    new ResponseHandler("Form fetched successfully", 200, fetchedForm, true),
    { status: 200 },
  );
});
