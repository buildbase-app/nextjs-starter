import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'الرئيسية',
      dashboard: 'لوحة التحكم',
      documents: 'المستندات',
      analytics: 'التحليلات',
      team: 'الفريق',
      notifications: 'الإشعارات',
      settings: 'الإعدادات',
      menu: 'القائمة',
      selectWorkspace: 'اختر مساحة العمل',
      profile: 'الملف الشخصي',
      manageWorkspace: 'إدارة مساحة العمل',
      generalSettings: 'الإعدادات العامة',
      userManagement: 'إدارة المستخدمين',
      billingPayments: 'الفواتير والمدفوعات',
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
    accessibility: {
      skipToContent: 'انتقل إلى المحتوى',
    },
    theme: {
      toggle: 'تبديل السمة',
      light: 'فاتح',
      dark: 'داكن',
      system: 'النظام',
    },
    redirecting: 'جاري إعادة التوجيه...',
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
        placeholder: 'محتوى المستندات سيظهر هنا.',
      },
      analytics: {
        title: 'التحليلات',
        description: 'عرض تحليلاتك',
        placeholder: 'محتوى التحليلات سيظهر هنا.',
      },
      team: {
        title: 'الفريق',
        description: 'إدارة فريقك',
        placeholder: 'محتوى إدارة الفريق سيظهر هنا.',
      },
      settings: {
        title: 'الإعدادات',
        description: 'إدارة إعداداتك',
        placeholder: 'محتوى الإعدادات سيظهر هنا.',
      },
    },
  },
  pricing: {
    title: 'الأسعار',
    subtitle: 'اختر الخطة التي تناسب احتياجاتك',
    billing: 'الفوترة',
    monthly: 'شهري',
    quarterly: 'ربع سنوي',
    yearly: 'سنوي',
    perMonth: '/شهر',
    perQuarter: '/ربع',
    perYear: '/سنة',
    currency: 'العملة',
    quotas: 'الحصص',
    limits: 'الحدود',
    features: 'الميزات',
    included: 'مشمول',
    perUnit: 'بعد ذلك',
    loading: 'جاري تحميل الخطط...',
    noPlans: 'لا توجد خطط متاحة',
    error: 'فشل تحميل الأسعار',
    meta: {
      title: 'الأسعار',
      description: 'عرض خططنا وأسعارنا',
    },
  },
  errors: {
    generic: {
      title: 'حدث خطأ ما',
      description:
        'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو الاتصال بالدعم إذا استمرت المشكلة.',
      tryAgain: 'حاول مرة أخرى',
      goHome: 'العودة للرئيسية',
    },
    notFound: {
      title: 'الصفحة غير موجودة',
      description:
        'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها.',
      goBack: 'العودة',
    },
  },
};

export default messages;
