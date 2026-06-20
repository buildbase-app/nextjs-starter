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
      credits: 'Credits',
      creditUsage: 'Credit Usage',
      creditsAvailable: 'Available',
      usage: 'Usage',
      permissions: 'Permissions',
      events: 'Events',
      invoices: 'Invoices',
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
  creditStore: {
    title: 'Credit Packages',
    subtitle:
      'Purchase credits to unlock premium features like AI generation, exports, and more.',
    buy: 'Buy Credits',
    validFor: 'Valid for {days} days',
    noExpiry: 'Never expires',
    noPackages: 'No credit packages available at this time.',
    error: 'Failed to load credit packages',
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
    credits: 'AI Credits',
    creditsPerPeriod: 'credits / period',
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
  credits: {
    title: 'Credits',
    description:
      'Use credits for premium actions. Manage packages in workspace settings.',
    balance: 'Credit Balance',
    creditsAvailable: 'credits available',
    manageCredits: 'Manage Credits',
    buyCredits: 'Buy Credits',
    choosePlan: 'Choose Plan',
    noCredits:
      'You have no credits remaining. Purchase more to continue using premium features.',
    buyMore: 'Buy Credits',
    testConsume: {
      title: 'Test Credit Consumption',
      description:
        'Use these buttons to test consuming credits from your balance.',
      use: 'Use {amount}',
      apiDescription: 'Test: consume {amount} credits',
      success: 'Consumed {amount} credits. Balance: {balance}',
      insufficient:
        'Not enough credits. Available: {available}, Requested: {requested}',
    },
    lowCredits: {
      title: 'الرصيد منخفض',
      description: 'رصيد النقاط لديك منخفض. قم بالشحن الآن لتجنب الانقطاع.',
    },
    expiring: {
      title: 'النقاط قاربت على الانتهاء',
      description: 'النقاط التي تنتهي صلاحيتها خلال 30 يومًا القادمة',
      expiresIn: 'تنتهي في {date}',
      noExpiring: 'لا توجد نقاط قاربت على الانتهاء',
      days: '{count} نقطة',
    },
    transactions: {
      title: 'سجل المعاملات',
      description: 'أحدث إضافات وخصومات النقاط',
      empty: 'لا توجد معاملات بعد',
      columns: {
        type: 'النوع',
        amount: 'المبلغ',
        balance: 'الرصيد بعد',
        description: 'الوصف',
      },
      types: {
        credit: 'إضافة',
        debit: 'خصم',
      },
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
