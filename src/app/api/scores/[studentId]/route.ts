import { errorResponse, notFoundResponse, successResponse } from "@/utils/response.handler";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) => {
  const { studentId } = await params;
  try {
    const res = await fetch(`${process.env.PUBLIC_BACKEND_URL}/v1/scores/${studentId}`);
    if (res.status === 404) return notFoundResponse({ message: "Student not found" });
    if (!res.ok) throw new Error("Failed to fetch");

    const { data } = await res.json();
    return successResponse({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(">> Error in @GET /api/get-scores/[studentId]:", message);
    return errorResponse({ message });
  }
}