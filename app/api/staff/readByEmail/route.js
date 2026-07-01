import { NextResponse } from "next/server";
import { wrapHandler } from "@/app/src/utility/wrapHandler";
import { staffService } from "@/app/src/Service/staff.service";
import auth from "@/app/src/Middleware/auth";
import ResponseHandler from "@/app/src/utility/ResponseHandler";

export const dynamic = "force-dynamic";

export const GET = wrapHandler(async (req) => {
  await auth(req);
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const email = decoded.email;

  const fetchedUserData = await staffService.readEmployeeByEmail(email);
  return NextResponse.json(
    new ResponseHandler("Fetched Successfully", 200, fetchedUserData, true),
    { status: 200 },
  );
});
