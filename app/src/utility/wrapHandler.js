import { NextResponse } from "next/server";
import { dbConnections } from "@/app/src/db";
import ApiErrorHandler from "./ApiErrorHandler";

export function wrapHandler(handler) {
  return async (req, context) => {
    try {
      await dbConnections();
      return await handler(req, context);
    } catch (err) {
      console.error("API Error:", err);
      const statusCode = err.statusCode || 500;
      return NextResponse.json(
        {
          success: false,
          message: err.message || "Something went wrong",
          errors: err.errors || [],
        },
        { status: statusCode },
      );
    }
  };
}
