import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import attendanceService from "@/app/src/Service/attendance.service";
import auth from "@/app/src/Middleware/auth";
import {
  validateBody,
  attendanceCreateSchema,
} from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  await auth(req);
  const body = await req.json();
  const validatedData = validateBody(body, attendanceCreateSchema);
  const newRecord = await attendanceService.createAttendance(validatedData);
  return NextResponse.json(
    new ResponseHandler("Created Successfully", 200, newRecord, true),
    { status: 201 },
  );
});
