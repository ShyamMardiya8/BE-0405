import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import attendanceService from "@/app/src/Service/attendance.service";
import auth from "@/app/src/Middleware/auth";
import {
  validateBody,
  attendanceUpdateSchema,
} from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";
import ApiErrorHandler from "@/app/src/utility/ApiErrorHandler";

export const PUT = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const staffId = searchParams.get("staffId");
  const date = searchParams.get("date");

  let target;
  if (id) {
    target = id;
  } else if (staffId && date) {
    target = { staffId, date };
  } else {
    throw new ApiErrorHandler(
      "Attendance ID or both staffId and date are required",
      400,
    );
  }

  const body = await req.json();
  const validatedData = validateBody(body, attendanceUpdateSchema);
  const updatedRecord = await attendanceService.updateAttendance(
    target,
    validatedData,
  );
  return NextResponse.json(
    new ResponseHandler("Updated Successfully", 200, updatedRecord, true),
    { status: 200 },
  );
});
