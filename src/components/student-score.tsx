import { SUBJECTS_KEY_VALUE } from "@/utils";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function StudentScore({ data, hideCaption = false }: { data: TScore, hideCaption?: boolean }) {
  return (
    <>
      <div className="md:hidden">
        <Table>
          {!hideCaption && (
            <TableCaption className="mb-2">
              Student ID: {data.studentId} | Foreign Language Code: {data.foreignCode}
            </TableCaption>
          )}
          <TableBody className="rounded overflow-hidden">
            <TableRow className="!bg-zinc-200">
              <TableCell className="font-medium">Student Id</TableCell>
              <TableCell className="text-right">{data.studentId}</TableCell>
            </TableRow>
            {SUBJECTS_KEY_VALUE.map((subject) => (
              <TableRow key={subject.name}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell className="text-right">{data[subject.key] !== null ? (data[subject.key] as number).toFixed(2) : 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="hidden md:block">
        <Table>
          {!hideCaption && (
            <TableCaption className="mb-2">
              Foreign Language Code: {data.foreignCode}
            </TableCaption>
          )}
          <TableHeader>
            <TableRow className="!bg-zinc-200">
              <TableHead className="w-[100px]">Student ID</TableHead>
              {SUBJECTS_KEY_VALUE.map((subject) => (
                <TableHead key={subject.key} className="min-w-[100px] text-center">{subject.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{data.studentId}</TableCell>
              {SUBJECTS_KEY_VALUE.map((subject) => (
                <TableCell key={subject.key} className="text-center">
                  {data[subject.key] !== null ? (data[subject.key] as number).toFixed(2) : 'N/A'}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
};
