import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import attendanceService from "@/app/src/Service/attendance.service";
import auth from "@/app/src/Middleware/auth";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const dynamic = "force-dynamic";

export const GET = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const staffId = searchParams.get("staffId");
  const date = searchParams.get("date");

  const query = {};
  if (id) query._id = id;
  if (staffId) query.staffId = staffId;
  if (date) query.date = date;

  const records = await attendanceService.readAttendance(query);
  return NextResponse.json(
    new ResponseHandler("Fetched Successfully", 200, records, true),
    { status: 200 },
  );
});
