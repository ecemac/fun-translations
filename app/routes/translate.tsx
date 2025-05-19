import type { Route } from "./+types/translate";
import { TranslateForm } from "../translate/form";
import type { Engine } from "domain/types/Engine";
import Content from "view/components/Content";
import Sidepane from "view/components/Sidepane";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useActionData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  // extracts the form values and gets user input
  const formData = await request.formData();
  const text = formData.get("text")?.toString() ?? "";
  const engine = formData.get("engine")?.toString() || "yoda";

  const translationService = createDefaultFunTranslationService(engine as Engine);
  const translation = await translationService.getTranslation(text);

  return translation;
};

export default function Translate() {
  const translation = useActionData();

  return (
    <div className="flex h-full py-3">
      <Sidepane>It would be nice to see past translations here.</Sidepane>
      <Content>
        <TranslateForm />
        {translation && (
          <div className="mt-4 text-zinc-900">
            <p><strong>Translation:</strong> {translation.text}</p>
          </div>
        )}
      </Content>
    </div>
  );
}
