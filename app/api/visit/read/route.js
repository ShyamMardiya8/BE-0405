import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import visitService from "@/app/src/Service/visit.service";
import auth from "@/app/src/Middleware/auth";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const dynamic = "force-dynamic";

export const GET = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const staffId = searchParams.get("staffId");
  const clientId = searchParams.get("clientId");
  const status = searchParams.get("status");

  const query = {};
  if (id) query._id = id;
  if (staffId) query.staffId = staffId;
  if (clientId) query.clientId = clientId;
  if (status) query.status = status;

  const records = await visitService.readVisit(query);
  return NextResponse.json(
    new ResponseHandler("Fetched Successfully", 200, records, true),
    { status: 200 },
  );
});
