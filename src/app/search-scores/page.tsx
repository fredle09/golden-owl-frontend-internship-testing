import { DetailScores } from "@/components/detail-scores";
import { RegistrationForm } from "@/components/registration-form";

export default async function SearchPage() {
  return (
    <main className="flex flex-col w-full gap-4 self-start">
      <RegistrationForm />

      <DetailScores />
    </main>
  );
};
