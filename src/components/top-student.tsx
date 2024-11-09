"use client";

import { fetcher } from "@/utils/function";
import { Fragment, useState } from "react";
import useSWR from "swr"
import { Skeleton } from "./ui/skeleton";
import StudentScore from "./student-score";
import { PUBLIC_BACKEND_URL } from "@/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"


export const TopStudent = () => {
  const [chooseGroup, setChooseGroup] = useState("group-a-0");
  const [chooseLimit, setChooseLimit] = useState("10");

  const { data, isLoading, error } = useSWR(
    `${PUBLIC_BACKEND_URL}/v1/scores?sort=${chooseGroup}&limit=${chooseLimit}`,
    fetcher
  );

  console.log(`${PUBLIC_BACKEND_URL}/v1/scores?sort=${chooseGroup}&limit=${chooseLimit}`);

  return (
    <div className="w-full aspect-video gap-4">
      <h1 className="font-bold text-xl inline-flex flex-row items-center gap-2 text-nowrap mb-8">
        <span>Top</span>
        <Select defaultValue="10" value={chooseLimit} onValueChange={setChooseLimit}>
          <SelectTrigger>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span>student group</span>
        <Select defaultValue="group-a-0" value={chooseGroup} onValueChange={setChooseGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="group-a-0">A0</SelectItem>
            <SelectItem value="group-a-1">A1</SelectItem>
            <SelectItem value="group-b-0">B0</SelectItem>
          </SelectContent>
        </Select>
      </h1>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-24" />
          ))
        ) : (
          error ? (
            <p>Error: {error?.message}</p>
          ) : (
            data?.map((student: TScore, index: number) => (
              <Fragment key={student.studentId}>
                <h2 className="font-mono font-bold text-md">TOP {index + 1}: {Number(student[chooseGroup]?.toFixed(2))}</h2>
                <StudentScore data={student} hideCaption />
              </Fragment>
            )))
        )}
      </div>
    </div>
  )
};
