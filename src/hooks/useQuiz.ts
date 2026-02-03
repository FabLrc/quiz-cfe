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

  const currentQuestion = useMemo(
    () => QUESTIONS[state.currentStep],
    [state.currentStep]
  );

  const progress = useMemo(
    () => ((state.currentStep + 1) / TOTAL_STEPS) * 100,
    [state.currentStep]
  );

  const isFirstStep = state.currentStep === 0;
  const isLastStep = state.currentStep === TOTAL_STEPS - 1;

  const setAnswer = useCallback(
    (answer: string | string[] | ContactFormData) => {
      dispatch({
        type: "SET_ANSWER",
        questionId: currentQuestion.id,
        answer,
      });
    },
    [currentQuestion.id]
  );

  const nextStep = useCallback(() => {
    dispatch({ type: "NEXT_STEP" });
  }, []);

  const previousStep = useCallback(() => {
    dispatch({ type: "PREVIOUS_STEP" });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: "GO_TO_STEP", step });
  }, []);

  const canProceed = useCallback(() => {
    const answer = state.answers[currentQuestion.id];

    if (!currentQuestion.required) return true;

    if (currentQuestion.type === "contact") {
      const contactData = answer as ContactFormData | undefined;
      if (!contactData) return false;

      const requiredFields = currentQuestion.fields?.filter((f) => f.required) ?? [];
      return requiredFields.every((field) => {
        const value = contactData[field.id as keyof ContactFormData];
        return value && String(value).trim().length > 0;
      });
    }

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    return answer !== undefined && answer !== "";
  }, [state.answers, currentQuestion]);

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
    currentQuestion,
    progress,
    isFirstStep,
    isLastStep,
    totalSteps: TOTAL_STEPS,

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
