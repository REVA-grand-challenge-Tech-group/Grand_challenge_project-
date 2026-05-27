import axios from 'axios';

class BhashiniTranslate {
  constructor() {
    this.cache = new Map();
    this.apiUrl = 'http://localhost:5001/api/translate';
  }

  async translateText(text, targetLang, sourceLang = 'english') {
    if (targetLang === 'english') return text;
    
    const cacheKey = `${text}_${targetLang}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    try {
      const response = await axios.post(`${this.apiUrl}/text`, {
        text,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang
      });
      
      const translated = response.data.translatedText || text;
      this.cache.set(cacheKey, translated);
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }

  async speechToText(audioBlob, language) {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('language', language);
      
      const response = await axios.post('http://localhost:5001/api/speech-to-text', formData);
      return response.data.text;
    } catch (error) {
      console.error('STT error:', error);
      return null;
    }
  }

  async textToSpeech(text, language) {
    try {
      const response = await axios.post('http://localhost:5001/api/text-to-speech', {
        text,
        language
      });
      return response.data.audio;
    } catch (error) {
      console.error('TTS error:', error);
      return null;
    }
  }
}

export default new BhashiniTranslate();