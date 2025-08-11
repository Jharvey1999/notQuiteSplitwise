import React, { createContext, useContext, useState, ReactNode } from 'react';
import { en, TranslationKeys } from '@/assets/languages/en';
import { es } from '@/assets/languages/es';
import { fr } from '@/assets/languages/fr';
import { de } from '@/assets/languages/de';
import { it } from '@/assets/languages/it';
import { pt } from '@/assets/languages/pt';
import { zh } from '@/assets/languages/zh';
import { ja } from '@/assets/languages/ja';
import { ko } from '@/assets/languages/ko';
import { ru } from '@/assets/languages/ru';
import { ar } from '@/assets/languages/ar';
import { hi } from '@/assets/languages/hi';
import { bn } from '@/assets/languages/bn';
import { ur } from '@/assets/languages/ur';
import { tr } from '@/assets/languages/tr';
import { vi } from '@/assets/languages/vi';
import { id } from '@/assets/languages/id';
import { th } from '@/assets/languages/th';
import { fil } from '@/assets/languages/fil';

type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja' | 'ko' | 'ru' | 'ar' | 'hi' | 'bn' | 'ur' | 'tr' | 'vi' | 'id' | 'th' | 'fil';

const languages: Record<Language, TranslationKeys> = {
  en,
  es,
  fr,
  de,
  it,
  pt,
  zh,
  ja,
  ko,
  ru,
  ar,
  hi,
  bn,
  ur,
  tr,
  vi,
  id,
  th,
  fil,
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  availableLanguages: Array<{ code: Language; name: string; displayKey: keyof TranslationKeys }>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
  initialLanguage?: Language;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  initialLanguage = 'en' 
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  
  const availableLanguages = [
    { code: 'en' as Language, name: 'English', displayKey: 'english' as keyof TranslationKeys },
    { code: 'es' as Language, name: 'Español', displayKey: 'spanish' as keyof TranslationKeys },
    { code: 'fr' as Language, name: 'Français', displayKey: 'french' as keyof TranslationKeys },
    { code: 'de' as Language, name: 'Deutsch', displayKey: 'german' as keyof TranslationKeys },
    { code: 'it' as Language, name: 'Italiano', displayKey: 'italian' as keyof TranslationKeys },
    { code: 'pt' as Language, name: 'Português', displayKey: 'portuguese' as keyof TranslationKeys },
    { code: 'zh' as Language, name: '中文', displayKey: 'chinese' as keyof TranslationKeys },
    { code: 'ja' as Language, name: '日本語', displayKey: 'japanese' as keyof TranslationKeys },
    { code: 'ko' as Language, name: '한국어', displayKey: 'korean' as keyof TranslationKeys },
    { code: 'ru' as Language, name: 'Русский', displayKey: 'russian' as keyof TranslationKeys },
    { code: 'ar' as Language, name: 'العربية', displayKey: 'arabic' as keyof TranslationKeys },
    { code: 'hi' as Language, name: 'हिन्दी', displayKey: 'hindi' as keyof TranslationKeys },
    { code: 'bn' as Language, name: 'বাংলা', displayKey: 'bengali' as keyof TranslationKeys },
    { code: 'ur' as Language, name: 'اردو', displayKey: 'urdu' as keyof TranslationKeys },
    { code: 'tr' as Language, name: 'Türkçe', displayKey: 'turkish' as keyof TranslationKeys },
    { code: 'vi' as Language, name: 'Tiếng Việt', displayKey: 'vietnamese' as keyof TranslationKeys },
    { code: 'id' as Language, name: 'Bahasa Indonesia', displayKey: 'indonesian' as keyof TranslationKeys },
    { code: 'th' as Language, name: 'ภาษาไทย', displayKey: 'thai' as keyof TranslationKeys },
    { code: 'fil' as Language, name: 'Filipino', displayKey: 'filipino' as keyof TranslationKeys },
  ];

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: languages[language],
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};