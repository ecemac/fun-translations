import type { Translation } from "domain/types/Translation";

const STORAGE_KEY = "translation_history";

const get = (): Translation[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

const set = (translation: Translation) => {
    const existing = get();
    const updated = [translation, ...existing.filter(
    t => !(t.text === translation.text && t.engine === translation.engine)
  )];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

const remove = (item: Translation) => {
  const updated = get().filter(
    t => !(t.text === item.text && t.engine === item.engine)
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

const clear = () => localStorage.removeItem(STORAGE_KEY);

export {get, set, remove, clear}