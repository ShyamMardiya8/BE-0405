import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import formService from "@/app/src/Service/form.service";
import auth from "@/app/src/Middleware/auth";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const dynamic = "force-dynamic";

export const GET = wrapHandler(async (req) => {
  await auth(req);
  const fetchedFormData = await formService.readForm();
  return NextResponse.json(
    new ResponseHandler(
      "Fetched From data successfully",
      200,
      fetchedFormData,
      true,
    ),
    { status: 200 },
  );
});
