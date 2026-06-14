import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import { staffService } from "@/src/Service/staff.service";
import auth from "@/src/Middleware/auth";
import { validateBody, staffValidatorSchema } from "@/src/utility/Validators";
import ResponseHandler from "@/src/utility/ResponseHandler";

export const PUT = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("id");
  const body = await req.json();
  const validatedData = validateBody(body, staffValidatorSchema);
  const updatedExistingEmployee = await staffService.updateEmployee(
    employeeId,
    validatedData
  );
  return NextResponse.json(new ResponseHandler("Updated Successfully", 200, updatedExistingEmployee, true), { status: 200 });
});
