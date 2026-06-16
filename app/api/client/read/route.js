import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import clientService from "@/src/Service/client.service";
import ResponseHandler from "@/src/utility/ResponseHandler";
import auth from "@/src/Middleware/auth";

export const dynamic = "force-dynamic";

export const GET = wrapHandler(async (req) => {
  await auth(req);
  const fetchedClientData = await clientService.readClient();
  return NextResponse.json(
    new ResponseHandler("Fetched Successfully", 200, fetchedClientData, true),
    { status: 200 },
  );
});
