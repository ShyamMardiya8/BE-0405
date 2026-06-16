import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import clientService from "@/app/src/Service/client.service";
import ResponseHandler from "@/app/src/utility/ResponseHandler";
import auth from "@/app/src/Middleware/auth";

export const DELETE = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("id");
  const fetchedClientData = await clientService.deleteClient(clientId);
  return NextResponse.json(
    new ResponseHandler("Deleted Successfully", 200, fetchedClientData, true),
    { status: 200 },
  );
});
