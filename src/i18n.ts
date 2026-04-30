import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  pt: {
    translation: {
      nav: {
        bandejas: "Bandejas FLV",
        calcos: "Calços Técnicos",
        agro: "Agro & Florestal",
        blog: "Blog",
        about: "Quem Somos",
        manifesto: "Manifesto",
        contact: "Fale com a Tamoios",
        login: "Entrar",
        logout: "Sair",
        admin: "Admin",
      },
      contact: {
        title: "Fale com a Tamoios",
        name: "Nome",
        email: "E-mail corporativo",
        company: "Empresa",
        phone: "Telefone (opcional)",
        segment: "Segmento de interesse",
        segments: {
          flv: "Bandejas FLV (varejo)",
          calcos: "Calços técnicos (indústria)",
          agro: "Agro & florestal",
          other: "Outro",
        },
        message: "Como podemos ajudar?",
        submit: "Enviar mensagem",
        sending: "Enviando…",
        whatsapp: "Continuar pelo WhatsApp",
        success: "Mensagem recebida! Em breve respondemos.",
        error: "Não foi possível enviar agora. Tente novamente.",
      },
      newsletter: {
        title: "Newsletter Tamoios",
        subtitle: "Cases, novos materiais e tendências de embalagem sustentável — uma vez por mês, sem spam.",
        placeholder: "seu e-mail corporativo",
        submit: "Inscrever-se",
        success: "Inscrição confirmada. Obrigado!",
        already: "Você já está inscrito.",
        error: "Não foi possível inscrever agora.",
      },
    },
  },
  en: {
    translation: {
      nav: {
        bandejas: "Produce Trays",
        calcos: "Industrial Cushions",
        agro: "Agro & Forestry",
        blog: "Blog",
        about: "About",
        manifesto: "Manifesto",
        contact: "Talk to Tamoios",
        login: "Sign in",
        logout: "Sign out",
        admin: "Admin",
      },
      contact: {
        title: "Talk to Tamoios",
        name: "Full name",
        email: "Work email",
        company: "Company",
        phone: "Phone (optional)",
        segment: "Area of interest",
        segments: {
          flv: "Produce Trays (retail)",
          calcos: "Industrial cushions",
          agro: "Agro & forestry",
          other: "Other",
        },
        message: "How can we help?",
        submit: "Send message",
        sending: "Sending…",
        whatsapp: "Continue on WhatsApp",
        success: "Message received! We'll reply shortly.",
        error: "Could not submit right now. Please try again.",
      },
      newsletter: {
        title: "Tamoios Newsletter",
        subtitle: "Cases, new materials and sustainable packaging trends — once a month, no spam.",
        placeholder: "your work email",
        submit: "Subscribe",
        success: "Subscription confirmed. Thank you!",
        already: "You're already subscribed.",
        error: "Could not subscribe right now.",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    supportedLngs: ["pt", "en"],
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
  });

export default i18n;
