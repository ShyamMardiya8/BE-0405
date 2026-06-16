import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import { staffService } from "@/app/src/Service/staff.service";
import auth from "@/app/src/Middleware/auth";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const DELETE = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("id");
  const updatedExistingEmployee = await staffService.deleteEmployee(employeeId);
  return NextResponse.json(
    new ResponseHandler(
      "Delete Successfully",
      200,
      updatedExistingEmployee,
      true,
    ),
    { status: 200 },
  );
});
