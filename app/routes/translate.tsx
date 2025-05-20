import { useEffect, useState } from "react";
import type { Route } from "./+types/translate";
import { TranslateForm } from "../translate/form";
import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";
import Content from "view/components/Content";
import Sidepane from "view/components/Sidepane";
import Button from "view/components/Button";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { get, set, remove, clear } from "io/service/TranslationHistoryService";
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
  const [history, setHistory] = useState<Translation[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    // get previous translations from localstorage
    setHistory(get());
    setHistoryLoading(false)
  }, []);

  useEffect(() => {
    if (!translation) return;
    // set new translation to localstorage
    set(translation)
    setHistory(get());
  }, [translation]);

  const handleRemove = (item: Translation) => {
    // remove translation from history
    remove(item);
    setHistory(get());
  };

  const handleClear = () => {
    clear()
    setHistory(get());
  }

  return (
    <div className="flex h-full py-3">
      <Sidepane>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Past translations</h3>
          {!historyLoading && history.length !== 0 && <Button className="border-white bg-transparent text-xs ml-2" onClick={handleClear}>Clear all</Button>}
          
        </div>
        
        {historyLoading ? <p className="text-zinc-500 italic">Loading history…</p> : history.length === 0 && <p>No past translations yet.</p>}
      
      {history.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <p className="text-left text-sm text-white">
              {item.engine} said: {item.text}
            </p>
            <button
              onClick={() => handleRemove(item)}
              className="text-red-500 text-xs ml-2"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </Sidepane>
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
