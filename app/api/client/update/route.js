import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import clientService from "@/src/Service/client.service";
import { validateBody, clientValidationSchema } from "@/src/utility/Validators";
import ResponseHandler from "@/src/utility/ResponseHandler";
import auth from "@/src/Middleware/auth";

export const PUT = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("id");
  const body = await req.json();
  const validatedData = validateBody(body, clientValidationSchema);
  const fetchedClientData = await clientService.updateClient(
    clientId,
    validatedData,
  );
  return NextResponse.json(
    new ResponseHandler("Updated Successfully", 200, fetchedClientData, true),
    { status: 200 },
  );
});
