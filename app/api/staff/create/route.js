import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import { staffService } from "@/app/src/Service/staff.service";
import auth from "@/app/src/Middleware/auth";
import {
  validateBody,
  staffValidatorSchema,
} from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  await auth(req);
  const body = await req.json();
  const validatedData = validateBody(body, staffValidatorSchema);
  const employee = await staffService.addEmployee(validatedData);
  return NextResponse.json(
    new ResponseHandler("Created successfully", 200, employee, true),
    { status: 201 },
  );
});
