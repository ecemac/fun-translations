import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="flex flex-col items-center justify-center p-16 gap-16">
        <h1 className="text-3xl font-bold text-white">Welcome to the Fun Translator App!</h1>
        <p className="text-white">Translate your text into fun languages like Yoda, Pirate or Sindarin.</p>
        <Link to="/translate" className="p-3 border border-white text-white rounded-md">
          Go to Translator
        </Link>
    </main>
  );
}


