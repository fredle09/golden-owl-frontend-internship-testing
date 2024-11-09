"use client";

import useSWR from "swr";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { PUBLIC_BACKEND_URL, SUBJECTS_KEY_VALUE } from "@/utils";
import { fetcher } from "@/utils/function";


export const DetailScores = () => {
  const searchParams = useSearchParams();
  const sbd = searchParams.get("sbd");

  const { data, isLoading, error } = useSWR(
    sbd ? `${PUBLIC_BACKEND_URL}/v1/scores/${sbd}` : null, fetcher)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Scores</CardTitle>
        <CardDescription>Detailed view of search scores here!</CardDescription>
      </CardHeader>
      {sbd && (
        <CardContent>
          <p>SBD: {sbd}</p>
          {error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            isLoading ? (
              <Skeleton className="w-full h-12" />
            ) : (
              !data ? (
                <p className="text-red-500">No data found</p>
              ) : (
                <>
                  <div className="md:hidden">
                    <Table>
                      <TableCaption className="mb-2">
                        Student ID: {data.studentId} | Foreign Language Code: {data.foreignCode}
                      </TableCaption>
                      <TableBody>
                        {SUBJECTS_KEY_VALUE.map((subject) => (
                          <TableRow key={subject.name}>
                            <TableCell className="font-medium">{subject.name}</TableCell>
                            <TableCell>{data[subject.key] !== null ? (data[subject.key] as number).toFixed(2) : 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="hidden md:block">
                    <Table>
                      <TableCaption className="mb-2">
                        Foreign Language Code: {data.foreignCode}
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Student ID</TableHead>
                          {SUBJECTS_KEY_VALUE.map((subject) => (
                            <TableHead key={subject.key} className="min-w-[100px]">{subject.name}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">{data.studentId}</TableCell>
                          {SUBJECTS_KEY_VALUE.map((subject) => (
                            <TableCell key={subject.key}>
                              {data[subject.key] !== null ? (data[subject.key] as number).toFixed(2) : 'N/A'}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </>
              )
            )
          )}
        </CardContent>
      )
      }
    </Card >
  );
};
