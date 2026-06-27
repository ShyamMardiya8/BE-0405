import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import taskService from "@/app/src/Service/task.service";
import auth from "@/app/src/Middleware/auth";
import {
  validateBody,
  taskUpdateSchema,
} from "@/app/src/utility/Validators";
import ResponseHandler from "@/app/src/utility/ResponseHandler";
import ApiErrorHandler from "@/app/src/utility/ApiErrorHandler";

export const PUT = wrapHandler(async (req) => {
  await auth(req);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    throw new ApiErrorHandler("Task ID is required", 400);
  }

  const body = await req.json();
  const validatedData = validateBody(body, taskUpdateSchema);
  const updatedRecord = await taskService.updateTask(id, validatedData);
  return NextResponse.json(
    new ResponseHandler("Updated Successfully", 200, updatedRecord, true),
    { status: 200 },
  );
});
