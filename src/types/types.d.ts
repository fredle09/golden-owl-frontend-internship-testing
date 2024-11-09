type TScore = {
  studentId: string;
  foreignCode: string;
  [key: keyof typeof SUBJECTS_KEY_VALUE[number]]: number | null;
}