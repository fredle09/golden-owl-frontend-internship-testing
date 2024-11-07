"use client";

import useSWR from "swr";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useSearchParams } from "next/navigation";


const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) { throw res; }
    throw new Error("An error occurred while fetching the data.");
  }

  const payload = await res.json();
  return payload;
}

export const DetailScores = () => {
  const searchParams = useSearchParams();
  const sbd = searchParams.get("sbd");

  const { data, isLoading, error } = useSWR(
    sbd ? `https://jsonplaceholder.typicode.com/todos/${sbd}` : null, fetcher)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Scores</CardTitle>
        <CardDescription>Detailed view of search scores here!</CardDescription>
      </CardHeader>
      {sbd && (
        <CardContent>
          <p>SBD: {sbd}</p>
          {isLoading && <p>Loading...</p>}
          {error && (
            error?.status === 404 ? (
              <></>
            ) : (
              <p>Failed to load data: {error.message}</p>
            )
          )}
          {data && (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </CardContent>
      )}
    </Card>
  );
};
