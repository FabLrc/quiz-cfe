export interface QuizAnswers {
  [questionId: string]: string | string[] | ContactFormData;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}

export interface QuizState {
  currentStep: number;
  answers: QuizAnswers;
  isSubmitting: boolean;
  isComplete: boolean;
}

export type QuizAction =
  | { type: "SET_ANSWER"; questionId: string; answer: string | string[] | ContactFormData }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_COMPLETE" }
  | { type: "RESET" };
