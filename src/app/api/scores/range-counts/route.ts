import { badRequestResponse, errorResponse, notFoundResponse, successResponse } from "@/utils/response.handler";

export const config = {
  runtime: 'edge',
}

export const GET = async () => {
  try {
    const res = await fetch(`${process.env.PUBLIC_BACKEND_URL}/v1/scores/range-counts`);
    const { data, message } = await res.json();
    if (res.status === 404) return notFoundResponse({ message });
    if (res.status >= 500) throw new Error(message);
    if (res.status >= 400) return badRequestResponse({ message });

    return successResponse({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(">> Error in @GET /api/get-scores/range-counts:", message);
    return errorResponse({ message });
  }
}
