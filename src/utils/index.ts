export enum EResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ERROR = 500,
}

export const SUBJECTS_KEY_VALUE = [
  { key: "math", name: "Math" },
  { key: "literature", name: "Literature" },
  { key: "foreignLanguage", name: "Foreign Language" },
  { key: "physics", name: "Physics" },
  { key: "chemistry", name: "Chemistry" },
  { key: "biology", name: "Biology" },
  { key: "history", name: "History" },
  { key: "geography", name: "Geography" },
  { key: "civics", name: "Civics" },
];

export const SCORE_RANGES = {
  LESS_THAN_4: "<4",
  BETWEEN_4_AND_6: ">=4 and <6",
  BETWEEN_6_AND_8: ">=6 and <8",
  GREATER_THAN_OR_EQUAL_8: ">=8",
};

export const PUBLIC_BACKEND_URL = "https://golden-owl-backend-internship-testing.onrender.com";
// export const PUBLIC_BACKEND_URL = "http://localhost:3001";

