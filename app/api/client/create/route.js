import { NextResponse } from "next/server";
import { wrapHandler } from "@/src/utility/wrapHandler";
import clientService from "@/src/Service/client.service";
import { validateBody, clientValidationSchema } from "@/src/utility/Validators";
import ResponseHandler from "@/src/utility/ResponseHandler";
import auth from "@/src/Middleware/auth";

export const POST = wrapHandler(async (req) => {
  await auth(req);
  const body = await req.json();
  const validatedData = validateBody(body, clientValidationSchema);
  const fetchedClientData = await clientService.createClient(validatedData);
  return NextResponse.json(
    new ResponseHandler("Created Successfully", 200, fetchedClientData, true),
    { status: 200 },
  );
});
