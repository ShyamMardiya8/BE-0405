import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import formService from "@/app/src/Service/form.service";
import auth from "@/app/src/Middleware/auth";
import {
  validateBody,
  formBuilderValidation,
} from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const PUT = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  const validatedData = validateBody(body, formBuilderValidation);
  const updatedForm = await formService.updateForm(id, validatedData);
  return NextResponse.json(
    new ResponseHandler("Form updated Successfully", 200, [], true),
    { status: 200 },
  );
});
