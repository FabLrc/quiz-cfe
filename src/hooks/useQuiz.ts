"use client";

import { useReducer, useCallback, useMemo } from "react";
import { QUESTIONS, TOTAL_STEPS } from "@/config/questions";
import type { QuizState, QuizAction, QuizAnswers, ContactFormData } from "@/types/quiz";

const initialState: QuizState = {
  currentStep: 0,
  answers: {},
  isSubmitting: false,
  isComplete: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer,
        },
      };

    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
      };

    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };

    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.step, TOTAL_STEPS - 1)),
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case "SET_COMPLETE":
      return {
        ...state,
        isComplete: true,
        isSubmitting: false,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const isFirstStep = state.currentStep === 0;

  // Compute visible questions based on `dependsOn` rules in config.
  const visibleQuestions = useMemo(() => {
    const visible: typeof QUESTIONS = [];

    for (const q of QUESTIONS) {
      if (!q.dependsOn || q.dependsOn.length === 0) {
        visible.push(q);
        continue;
      }

      // Include question if at least one dependency is satisfied
      const satisfied = q.dependsOn.some((dep) => {
        const ans = state.answers[dep.questionId];
        if (ans === undefined) return false;
        if (Array.isArray(ans)) return ans.some((a) => dep.values.includes(String(a)));
        return dep.values.includes(String(ans));
      });

      if (satisfied) visible.push(q);
    }

    return visible;
  }, [state.answers]);

  const setAnswer = useCallback(
    (answer: string | string[] | ContactFormData | number) => {
      dispatch({
        type: "SET_ANSWER",
        questionId: (visibleQuestions[state.currentStep] ?? QUESTIONS[state.currentStep]).id,
        answer,
      });
    },
    [state.currentStep, visibleQuestions]
  );

  const nextStep = useCallback(() => {
    const max = Math.max(visibleQuestions.length - 1, 0);
    const next = Math.min(state.currentStep + 1, max);
    dispatch({ type: "GO_TO_STEP", step: next });
  }, [state.currentStep, visibleQuestions.length]);

  const previousStep = useCallback(() => {
    const prev = Math.max(state.currentStep - 1, 0);
    dispatch({ type: "GO_TO_STEP", step: prev });
  }, [state.currentStep]);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: "GO_TO_STEP", step });
  }, []);

  const canProceed = useCallback(() => {
    const q = visibleQuestions[state.currentStep] ?? QUESTIONS[state.currentStep];
    const answer = state.answers[q.id];

    if (!q.required) return true;

    if (q.type === "contact") {
      const contactData = answer as ContactFormData | undefined;
      if (!contactData) return false;

      const requiredFields = q.fields?.filter((f) => f.required) ?? [];
      return requiredFields.every((field) => {
        const value = contactData[field.id as keyof ContactFormData];
        return value && String(value).trim().length > 0;
      });
    }

    if (q.type === "range") {
      return answer !== undefined && answer !== null && typeof answer === "number";
    }

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    return answer !== undefined && answer !== "";
  }, [state.answers, state.currentStep, visibleQuestions]);

  const submitQuiz = useCallback(async (): Promise<boolean> => {
    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.answers),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      dispatch({ type: "SET_COMPLETE" });
      return true;
    } catch (error) {
      console.error("Erreur de soumission:", error);
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
      return false;
    }
  }, [state.answers]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    // State
    currentStep: state.currentStep,
    answers: state.answers as QuizAnswers,
    isSubmitting: state.isSubmitting,
    isComplete: state.isComplete,
    // visible flow
    currentQuestion: visibleQuestions[state.currentStep],
    progress: ((state.currentStep + 1) / Math.max(visibleQuestions.length, 1)) * 100,
    isFirstStep,
    isLastStep: state.currentStep === Math.max(visibleQuestions.length - 1, 0),
    totalSteps: visibleQuestions.length,

    // Actions
    setAnswer,
    nextStep,
    previousStep,
    goToStep,
    canProceed,
    submitQuiz,
    reset,
  };
}
