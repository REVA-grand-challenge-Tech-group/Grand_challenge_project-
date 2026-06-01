import { useLanguage } from '../context/LanguageContext';

export const useTranslation = () => {
  const { t, currentLanguage, translateDynamic, loading } = useLanguage();
  
  return {
    t,
    currentLanguage,
    translateDynamic,
    isLoading: loading
  };
};