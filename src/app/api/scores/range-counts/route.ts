import { badRequestResponse, errorResponse, notFoundResponse, successResponse } from "@/utils/response.handler";

export const GET = async () => {
  return new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `${process.env.PUBLIC_BACKEND_URL}/v1/scores/range-counts`;

    xhr.open('GET', url, true); // Open a GET request to the URL

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {  // Check if request is complete
        const status = xhr.status;

        try {
          const response = JSON.parse(xhr.responseText); // Parse the response text as JSON
          const { data, message } = response;

          if (status === 404) return resolve(notFoundResponse({ message }));
          if (status >= 500) throw new Error(message);
          if (status >= 400) return resolve(badRequestResponse({ message }));

          return resolve(successResponse({ data }));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'An unknown error occurred';
          console.error(">> Error in @GET /api/get-scores/range-counts:", message);
          return resolve(errorResponse({ message }));
        }
      }
    };

    xhr.onerror = () => {
      // Handle network errors
      return reject(new Error('Network error occurred while making the request'));
    };

    xhr.send();  // Send the request
  });
};