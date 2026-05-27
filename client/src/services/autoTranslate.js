// This file automatically translates UI text using Bhashini
import axios from 'axios';

class AutoTranslate {
  constructor() {
    this.currentLanguage = 'english';
    this.cache = new Map();
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
  }

  async translate(text, targetLang = this.currentLanguage) {
    if (targetLang === 'english') return text;
    
    // Check cache
    const cacheKey = `${text}_${targetLang}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    try {
      const response = await axios.post('/api/translate/translate', {
        text,
        targetLang,
        sourceLang: 'english'
      });
      
      if (response.data.success) {
        this.cache.set(cacheKey, response.data.translatedText);
        return response.data.translatedText;
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
    
    return text; // Fallback to original
  }

  // Auto-translate all text elements on page
  async translatePage() {
    if (this.currentLanguage === 'english') return;
    
    const elements = document.querySelectorAll('[data-translate]');
    for (const element of elements) {
      const originalText = element.getAttribute('data-original') || element.innerText;
      if (!element.hasAttribute('data-original')) {
        element.setAttribute('data-original', originalText);
      }
      
      const translated = await this.translate(originalText);
      element.innerText = translated;
    }
  }
}

export default new AutoTranslate();