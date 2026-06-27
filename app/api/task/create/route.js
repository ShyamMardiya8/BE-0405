import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import taskService from "@/app/src/Service/task.service";
import auth from "@/app/src/Middleware/auth";
import {
  validateBody,
  taskCreateSchema,
} from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const POST = wrapHandler(async (req) => {
  await auth(req);
  const body = await req.json();
  const validatedData = validateBody(body, taskCreateSchema);
  const newRecord = await taskService.createTask(validatedData);
  return NextResponse.json(
    new ResponseHandler("Created Successfully", 200, newRecord, true),
    { status: 201 },
  );
});
