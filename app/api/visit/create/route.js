import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import visitService from "@/app/src/Service/visit.service";
import auth from "@/app/src/Middleware/auth";
import {
  validateBody,
  visitCreateSchema,
} from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  await auth(req);
  const body = await req.json();
  const validatedData = validateBody(body, visitCreateSchema);
  const newRecord = await visitService.createVisit(validatedData);
  return NextResponse.json(
    new ResponseHandler("Created Successfully", 200, newRecord, true),
    { status: 201 },
  );
});
