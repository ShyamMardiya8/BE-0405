import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import formService from "@/src/Service/form.service";
import auth from "@/src/Middleware/auth";
import ResponseHandler from "@/src/utility/ResponseHandler";

export const DELETE = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const formId = searchParams.get("id");
  const deletedFormData = await formService.deleteForm(formId);
  return NextResponse.json(new ResponseHandler("Form Deleted Successfully", 200, [], true), { status: 200 });
});
