import { Header, Footer, QuizContainer } from "@/components";

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 overflow-y-auto">
        {/* Introduction */}
        <div className="text-center mb-6 max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-[#212529] mb-2">
            Démarrons votre projet{" "}
            <span className="bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC] bg-clip-text text-transparent">
              ensemble
            </span>
          </h1>
          <p className="text-[#212529]/70 text-base">
            Répondez à quelques questions pour recevoir un devis personnalisé.
          </p>
        </div>

        {/* Quiz */}
        <QuizContainer />
      </main>

      <Footer />
    </div>
  );
}
