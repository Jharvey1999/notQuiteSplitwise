import { useLanguage } from '@/components/LanguageContext';

export const useTranslation = () => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  
  return {
    t,
    language,
    setLanguage,
    availableLanguages,
  };
};