import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import { staffService } from "@/app/src/Service/staff.service";
import auth from "@/app/src/Middleware/auth";
import {
  validateBody,
  staffValidatorSchema,
} from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const PUT = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("id");
  const body = await req.json();
  const validatedData = validateBody(body, staffValidatorSchema);
  const updatedExistingEmployee = await staffService.updateEmployee(
    employeeId,
    validatedData,
  );
  return NextResponse.json(
    new ResponseHandler(
      "Updated Successfully",
      200,
      updatedExistingEmployee,
      true,
    ),
    { status: 200 },
  );
});
