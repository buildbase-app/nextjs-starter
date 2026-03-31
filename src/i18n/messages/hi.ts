import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      documents: 'दस्तावेज़',
      analytics: 'एनालिटिक्स',
      team: 'टीम',
      settings: 'सेटिंग्स',
      menu: 'मेनू',
      selectWorkspace: 'वर्कस्पेस चुनें',
      profile: 'प्रोफ़ाइल',
      manageWorkspace: 'वर्कस्पेस प्रबंधित करें',
      generalSettings: 'सामान्य सेटिंग्स',
      userManagement: 'उपयोगकर्ता प्रबंधन',
      billingPayments: 'बिलिंग और भुगतान',
    },
    buttons: {
      signIn: 'साइन इन करें',
      signOut: 'साइन आउट',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      create: 'बनाएं',
      loading: 'लोड हो रहा है...',
    },
    auth: {
      signInPrompt: 'जारी रखने के लिए साइन इन करें',
      signOutConfirm: 'क्या आप साइन आउट करना चाहते हैं?',
    },
    footer: {
      rights: 'सर्वाधिकार सुरक्षित',
    },
    language: {
      select: 'भाषा चुनें',
      current: 'वर्तमान भाषा',
    },
    accessibility: {
      skipToContent: 'मुख्य सामग्री पर जाएं',
    },
    theme: {
      toggle: 'थीम बदलें',
      light: 'लाइट',
      dark: 'डार्क',
      system: 'सिस्टम',
    },
    redirecting: 'रीडायरेक्ट हो रहा है...',
  },
  home: {
    title: 'मेरा ऐप',
    hero: {
      heading: 'मेरे ऐप में आपका स्वागत है',
      description:
        'Next.js, TypeScript, Tailwind CSS, shadcn/ui, next-themes और BuildBase SDK के साथ बनाया गया।',
    },
    meta: {
      title: 'मेरा ऐप',
      description: 'shadcn/ui और थीम सपोर्ट के साथ मेरा Next.js एप्लिकेशन',
      tagline: 'कुछ अद्भुत बनाएं',
    },
  },
  dashboard: {
    title: 'डैशबोर्ड',
    welcome: 'वापसी पर स्वागत है, {name}!',
    cards: {
      workspace: {
        title: 'वर्तमान वर्कस्पेस',
        empty: 'कोई वर्कस्पेस नहीं चुना गया',
      },
      role: {
        title: 'आपकी भूमिका',
        empty: 'उपलब्ध नहीं',
      },
      email: {
        title: 'ईमेल',
      },
      status: {
        title: 'स्थिति',
        active: 'सक्रिय',
        inactive: 'निष्क्रिय',
      },
    },
    quickActions: {
      title: 'त्वरित कार्य',
      createProject: 'प्रोजेक्ट बनाएं',
      viewReports: 'रिपोर्ट देखें',
      inviteTeam: 'टीम सदस्य आमंत्रित करें',
    },
    pages: {
      documents: {
        title: 'दस्तावेज़',
        description: 'अपने दस्तावेज़ प्रबंधित करें',
        placeholder: 'दस्तावेज़ सामग्री यहाँ आएगी।',
      },
      analytics: {
        title: 'एनालिटिक्स',
        description: 'अपने एनालिटिक्स देखें',
        placeholder: 'एनालिटिक्स सामग्री यहाँ आएगी।',
      },
      team: {
        title: 'टीम',
        description: 'अपनी टीम प्रबंधित करें',
        placeholder: 'टीम प्रबंधन सामग्री यहाँ आएगी।',
      },
      settings: {
        title: 'सेटिंग्स',
        description: 'अपनी सेटिंग्स प्रबंधित करें',
        placeholder: 'सेटिंग्स सामग्री यहाँ आएगी।',
      },
    },
  },
  errors: {
    generic: {
      title: 'कुछ गलत हो गया',
      description:
        'एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें या समस्या बनी रहने पर सहायता से संपर्क करें।',
      tryAgain: 'पुनः प्रयास करें',
      goHome: 'होमपेज पर जाएं',
    },
    notFound: {
      title: 'पृष्ठ नहीं मिला',
      description:
        'क्षमा करें, हम वह पृष्ठ नहीं ढूंढ पाए जिसे आप खोज रहे हैं। यह स्थानांतरित या हटाया जा सकता है।',
      goBack: 'वापस जाएं',
    },
  },
};

export default messages;
