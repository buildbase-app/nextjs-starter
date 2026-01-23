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
      },
      analytics: {
        title: 'एनालिटिक्स',
        description: 'अपने एनालिटिक्स देखें',
      },
      team: {
        title: 'टीम',
        description: 'अपनी टीम प्रबंधित करें',
      },
      settings: {
        title: 'सेटिंग्स',
        description: 'अपनी सेटिंग्स प्रबंधित करें',
      },
    },
  },
};

export default messages;
