import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";
import cacheService from "./CacheService";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import PirateTranslationRepo from "../repo/PirateTranslationRepo";
import SindarinTranslationRepo from "io/repo/SindarinTranslationRepo";

interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

type TranslationRepo = YodaTranslationRepo | PirateTranslationRepo | SindarinTranslationRepo


class DefaultFunTranslationService implements FunTranslationService {
  repo: TranslationRepo;
  engine: Engine;

  constructor(repo: TranslationRepo, engine: Engine) {
    this.repo = repo;
    this.engine = engine;
  }

  async getTranslation(text: string) {
    const key = `${this.engine}:${text}`;

    // use cached result
    if (cacheService.has(key)) {
      return cacheService.get(key)!;
    }

    const response = await this.repo.getTranslation(text);
    const payload = await response.json();

    const translation: Translation = {
      text: payload.contents.translated,
      engine: payload.contents.translation as Engine
    };

    // store translation in cache
    cacheService.set(key, translation); 
    return translation;
  }
}

const createDefaultFunTranslationService = (engine: Engine) => {
  let repo: TranslationRepo;
  switch (engine) {
    case "pirate":
      repo = new PirateTranslationRepo();
      break;
    case "sindarin":
      repo = new SindarinTranslationRepo();
      break;
    case "yoda":
      repo = new YodaTranslationRepo();
      break;
    default:
      repo = new YodaTranslationRepo();
      break;
  }
  
  const service = new DefaultFunTranslationService(repo, engine);

  return service;
};

export { DefaultFunTranslationService, createDefaultFunTranslationService };
