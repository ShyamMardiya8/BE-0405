import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import attendanceService from "@/app/src/Service/attendance.service";
import auth from "@/app/src/Middleware/auth";
import ResponseHandler from "@/app/src/utility/ResponseHandler";
import ApiErrorHandler from "@/app/src/utility/ApiErrorHandler";

export const DELETE = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    throw new ApiErrorHandler("Attendance record ID is required", 400);
  }
  const deletedRecord = await attendanceService.deleteAttendance(id);
  return NextResponse.json(
    new ResponseHandler("Delete Successfully", 200, deletedRecord, true),
    { status: 200 },
  );
});
