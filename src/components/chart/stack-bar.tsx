"use client"

import { ChevronDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SCORE_RANGES, SUBJECTS_KEY_VALUE } from "@/utils"
import useSWR from "swr"
import { fetcher } from "@/utils/function"
import { Skeleton } from "../ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

const chartConfig = {
  LESS_THAN_4: {
    label: "Less than 4",
    color: "hsl(var(--chart-1))",
  },
  BETWEEN_4_AND_6: {
    label: "From 4 to 6",
    color: "hsl(var(--chart-2))",
  },
  BETWEEN_6_AND_8: {
    label: "From 6 to 8",
    color: "hsl(var(--chart-3))",
  },
  GREATER_THAN_OR_EQUAL_8: {
    label: "More than 8",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function StackBar() {
  const { data, isLoading, error } = useSWR("https://golden-owl-backend-internship-testing.onrender.com/v1/scores/range-counts", fetcher);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([
    "LESS_THAN_4",
    "BETWEEN_4_AND_6",
    "BETWEEN_6_AND_8",
    "GREATER_THAN_OR_EQUAL_8"
  ]);

  // Handle checkbox change
  const handleCheckboxChange = (range: string) => {
    setSelectedRanges((prevSelected) => {
      if (prevSelected.includes(range)) {
        return prevSelected.filter((item) => item !== range); // Deselect
      } else {
        return [...prevSelected, range]; // Select
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>Bar Chart - Stacked</CardTitle>
          <CardDescription>Chart of Subjects and High School Exam Scores for 2024</CardDescription>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="!mt-0">
              Filter
              <ChevronDown className="-mr-1.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 space-y-2 bg-white shadow-lg rounded-lg w-48" align="end">
            <div className="space-y-1">
              {Object.entries(chartConfig).map(([key, { label }]) => (
                <div key={key} className="filter-option flex items-center space-x-2">
                  {/* Using ShadCN Checkbox */}
                  <Checkbox
                    id={key}
                    checked={selectedRanges.includes(key)} // Check if the range is selected
                    onCheckedChange={() => handleCheckboxChange(key)} // Handle selection change
                  // className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <Label htmlFor={key} className="text-sm text-gray-700">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full aspect-video" />
        ) : (
          <>
            {error && (<p className="text-red-500">Error: {error?.message}</p>)}
            {data && (
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={data}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="subject"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => SUBJECTS_KEY_VALUE.find(keyValue => keyValue.key === value)?.name ?? "Hehe"}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  {Object.keys(chartConfig).map((key) => (
                    selectedRanges.includes(key) && (
                      <Bar
                        key={key}
                        dataKey={SCORE_RANGES[key as keyof typeof SCORE_RANGES]}
                        stackId="a"
                        fill={`var(--color-${key})`}
                      />
                    )))}
                </BarChart>
              </ChartContainer>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
