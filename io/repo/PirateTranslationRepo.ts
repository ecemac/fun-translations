class PirateTranslationRepo {
  async getTranslation(text: string) {
    // const response = await fetch(
    //   "https://api.funtranslations.com/translate/yoda.json",
    //   { method: "POST", body: JSON.stringify({ text }) }
    // );
    //
    // return response;

    const json = await import(
      "../mocks/api.funtranslations.com_translate_pirate.json"
    );

    return Promise.resolve({
      json() {
        return json;
      },
    });
  }
}

export default PirateTranslationRepo;
