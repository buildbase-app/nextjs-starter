import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'الرئيسية',
      dashboard: 'لوحة التحكم',
      documents: 'المستندات',
      analytics: 'التحليلات',
      team: 'الفريق',
      settings: 'الإعدادات',
    },
    buttons: {
      signIn: 'تسجيل الدخول',
      signOut: 'تسجيل الخروج',
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      create: 'إنشاء',
      loading: 'جاري التحميل...',
    },
    auth: {
      signInPrompt: 'يرجى تسجيل الدخول للمتابعة',
      signOutConfirm: 'هل أنت متأكد من تسجيل الخروج؟',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
    },
    language: {
      select: 'اختر اللغة',
      current: 'اللغة الحالية',
    },
  },
  home: {
    title: 'تطبيقي',
    hero: {
      heading: 'مرحباً بك في تطبيقي',
      description:
        'مبني باستخدام Next.js و TypeScript و Tailwind CSS و shadcn/ui و next-themes و BuildBase SDK.',
    },
    meta: {
      title: 'تطبيقي',
      description: 'تطبيق Next.js الخاص بي مع shadcn/ui ودعم السمات',
      tagline: 'ابنِ شيئًا مذهلاً',
    },
  },
  dashboard: {
    title: 'لوحة التحكم',
    welcome: 'مرحباً بعودتك، {name}!',
    cards: {
      workspace: {
        title: 'مساحة العمل الحالية',
        empty: 'لم يتم تحديد مساحة عمل',
      },
      role: {
        title: 'دورك',
        empty: 'غير متوفر',
      },
      email: {
        title: 'البريد الإلكتروني',
      },
      status: {
        title: 'الحالة',
        active: 'نشط',
        inactive: 'غير نشط',
      },
    },
    quickActions: {
      title: 'إجراءات سريعة',
      createProject: 'إنشاء مشروع',
      viewReports: 'عرض التقارير',
      inviteTeam: 'دعوة عضو للفريق',
    },
    pages: {
      documents: {
        title: 'المستندات',
        description: 'إدارة مستنداتك',
      },
      analytics: {
        title: 'التحليلات',
        description: 'عرض تحليلاتك',
      },
      team: {
        title: 'الفريق',
        description: 'إدارة فريقك',
      },
      settings: {
        title: 'الإعدادات',
        description: 'إدارة إعداداتك',
      },
    },
  },
};

export default messages;
