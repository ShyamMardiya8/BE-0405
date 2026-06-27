import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import visitService from "@/app/src/Service/visit.service";
import ResponseHandler from "@/app/src/utility/ResponseHandler";
import auth from "@/app/src/Middleware/auth";
import ApiErrorHandler from "@/app/src/utility/ApiErrorHandler";

export const DELETE = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    throw new ApiErrorHandler("Visit ID is required", 400);
  }
  const deletedRecord = await visitService.deleteVisit(id);
  return NextResponse.json(
    new ResponseHandler("Deleted Successfully", 200, deletedRecord, true),
    { status: 200 },
  );
});
