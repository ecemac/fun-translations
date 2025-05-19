import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import PirateTranslationRepo from "../repo/PirateTranslationRepo";

interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

type TranslationRepo = YodaTranslationRepo | PirateTranslationRepo


class DefaultFunTranslationService implements FunTranslationService {
  repo: TranslationRepo;

  constructor(repo: TranslationRepo) {
    this.repo = repo;
  }

  async getTranslation(text: string) {
    const response = await this.repo.getTranslation(text);
    const payload = await response.json();

    const translation: Translation = {
  text: payload.contents.translated,
  engine: payload.contents.translation as Engine
};
    return translation;
  }
}

const createDefaultFunTranslationService = (engine: Engine) => {
  let repo: TranslationRepo;
  switch (engine) {
    case "pirate":
      repo = new PirateTranslationRepo();
      break;
    case "yoda":
    default:
      repo = new YodaTranslationRepo();
      break;
  }
  
  const service = new DefaultFunTranslationService(repo);

  return service;
};

export { DefaultFunTranslationService, createDefaultFunTranslationService };
