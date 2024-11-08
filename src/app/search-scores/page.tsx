import { DetailScores } from "@/components/detail-scores";
import { RegistrationForm } from "@/components/registration-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function SearchPage() {
  return (
    <main className="flex flex-col w-full gap-4 self-start">
      <Suspense fallback={<Skeleton className="w-full h-12" />}>
        <RegistrationForm />
      </Suspense>

      <Suspense fallback={<Skeleton className="w-full h-12" />}>
        <DetailScores />
      </Suspense>
    </main>
  );
};
