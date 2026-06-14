import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import { staffService } from "@/src/Service/staff.service";
import auth from "@/src/Middleware/auth";
import ResponseHandler from "@/src/utility/ResponseHandler";

export const dynamic = 'force-dynamic';

export const GET = wrapHandler(async (req) => {
  await auth(req);
  const fetchedUserData = await staffService.readEmployee();
  return NextResponse.json(new ResponseHandler("Fetched Successfully", 200, fetchedUserData, true), { status: 200 });
});
