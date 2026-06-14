import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import formService from "@/src/Service/form.service";
import auth from "@/src/Middleware/auth";
import { validateBody, formBuilderValidation } from "@/src/utility/Validators";
import ResponseHandler from "@/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  await auth(req);
  const body = await req.json();
  const validatedData = validateBody(body, formBuilderValidation);
  const createdForm = await formService.createForm(validatedData);
  return NextResponse.json(new ResponseHandler("Form Created Successfully", 200, createdForm, true), { status: 200 });
});
