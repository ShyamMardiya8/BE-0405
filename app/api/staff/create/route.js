import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import { staffService } from "@/src/Service/staff.service";
import auth from "@/src/Middleware/auth";
import { validateBody, staffValidatorSchema } from "@/src/utility/Validators";
import ResponseHandler from "@/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  await auth(req);
  const body = await req.json();
  const validatedData = validateBody(body, staffValidatorSchema);
  const employee = await staffService.addEmployee(validatedData);
  return NextResponse.json(new ResponseHandler("Created successfully", 200, employee, true), { status: 201 });
});
