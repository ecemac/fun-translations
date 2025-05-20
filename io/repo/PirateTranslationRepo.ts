class PirateTranslationRepo {
  async getTranslation(text: string) {
    const response = await fetch(
      "https://api.funtranslations.com/translate/pirate.json",
      { method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }) 
      }
     );
    
    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response;
  }
}

export default PirateTranslationRepo;
