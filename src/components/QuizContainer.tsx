"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "@/hooks/useQuiz";
import {
  ProgressLine,
  OptionCard,
  NavigationButtons,
  ContactForm,
  SuccessScreen,
} from "@/components/ui";
import type { ContactFormData } from "@/types/quiz";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function QuizContainer() {
  const {
    currentStep,
    answers,
    isSubmitting,
    isComplete,
    currentQuestion,
    progress,
    isFirstStep,
    isLastStep,
    totalSteps,
    setAnswer,
    nextStep,
    previousStep,
    canProceed,
    submitQuiz,
    reset,
  } = useQuiz();

  const handleNext = async () => {
    if (!canProceed()) return;

    if (isLastStep) {
      await submitQuiz();
    } else {
      nextStep();
    }
  };

  const handleOptionClick = (value: string) => {
    if (currentQuestion.type === "single-choice") {
      setAnswer(value);
    } else if (currentQuestion.type === "multiple-choice") {
      const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((v) => v !== value)
        : [...currentAnswers, value];
      setAnswer(newAnswers);
    }
  };

  const isOptionSelected = (value: string): boolean => {
    const answer = answers[currentQuestion.id];
    if (Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  // Écran de succès
  if (isComplete) {
    return <SuccessScreen onReset={reset} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Barre de progression */}
      <ProgressLine
        progress={progress}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      {/* Contenu de la question */}
      <AnimatePresence mode="wait" custom={currentStep}>
        <motion.div
          key={currentQuestion.id}
          custom={currentStep}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mt-4"
        >
          {/* Titre de la question */}
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#212529]">
              {currentQuestion.title}
            </h2>
            {currentQuestion.subtitle && (
              <p className="text-[#212529]/60 mt-1 text-sm">{currentQuestion.subtitle}</p>
            )}
          </div>

          {/* Options ou formulaire */}
          {currentQuestion.type === "contact" && currentQuestion.fields ? (
            <ContactForm
              fields={currentQuestion.fields}
              value={(answers[currentQuestion.id] as ContactFormData) || {}}
              onChange={(data) => setAnswer(data)}
            />
          ) : (
            <div
              className={`grid gap-3 ${
                currentQuestion.options && currentQuestion.options.length > 4
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {currentQuestion.options?.map((option, index) => (
                <OptionCard
                  key={option.id}
                  id={option.id}
                  label={option.label}
                  description={option.description}
                  icon={option.icon}
                  isSelected={isOptionSelected(option.value)}
                  onClick={() => handleOptionClick(option.value)}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Boutons de navigation */}
      <NavigationButtons
        onNext={handleNext}
        onPrevious={previousStep}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        canProceed={canProceed()}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
