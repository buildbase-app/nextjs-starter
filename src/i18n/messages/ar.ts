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
      credits: 'الاعتمادات',
      creditUsage: 'استخدام الاعتمادات',
      creditsAvailable: 'متاح',
      usage: 'الاستخدام',
      permissions: 'الأذونات',
      events: 'الأحداث',
      invoices: 'الفواتير',
      workspace: 'مساحة العمل',
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
      tagline:
        'تطبيق عرض مباشر يُظهر BuildBase SDK في العمل. سجّل الدخول لاستكشاف المصادقة ومساحات العمل والاعتمادات والإشعارات الفورية وi18n.',
      sections: {
        product: 'المنتج',
        resources: 'الموارد',
        legal: 'قانوني',
      },
      links: {
        features: 'الميزات',
        pricing: 'الأسعار',
        dashboard: 'لوحة التحكم',
        credits: 'الاعتمادات',
        blog: 'المدونة',
        changelog: 'سجل التغييرات',
        about: 'حول',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة',
      },
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
    pages: {
      lastUpdated: 'آخر تحديث:',
    },
    redirecting: 'جاري إعادة التوجيه...',
  },
  home: {
    title: 'تطبيقي',
    hero: {
      badge: 'BuildBase SDK · عرض مباشر',
      heading:
        'A working demo built with the <highlight>BuildBase SDK</highlight>',
      description:
        'سجّل الدخول لترى المصادقة، ومساحات العمل متعددة المستأجرين، وفوترة الاعتمادات، والإشعارات الفورية، وi18n بـ8 لغات تعمل معاً في تطبيق حقيقي — مدعومة بـ BuildBase SDK.',
      signInToExplore: 'سجّل الدخول للاستكشاف',
      openDashboard: 'فتح لوحة التحكم',
      viewSource: 'عرض الكود المصدري',
      builtWith: 'مبني باستخدام',
    },
    stats: {
      languages: {
        label: 'اللغات في هذا العرض',
        sublabel: 'قم بالتبديل من خلال الزر في الرأس',
      },
      sdkFeatures: {
        label: 'ميزات SDK المباشرة',
        sublabel: 'لكل ميزة صفحة عرض',
      },
      notifications: {
        label: 'قنوات الإشعارات',
        sublabel: 'دفع المتصفح + البريد الإلكتروني',
      },
      authCode: {
        label: 'أسطر كود المصادقة',
        sublabel: 'SDK يتعامل مع كل شيء',
      },
    },
    cta: {
      heading: 'هل أنت مستعد لرؤية كل شيء يعمل؟',
      description:
        'سجّل الدخول لفتح لوحة التحكم الكاملة — جرّب تبديل مساحات العمل، واستهلاك الاعتمادات، وإرسال إشعار فوري، والتبديل بين جميع اللغات الـ8.',
      signIn: 'سجّل الدخول واستكشف',
      openDashboard: 'فتح لوحة التحكم',
      howBuilt: 'كيف تم بناؤه',
    },
    features: {
      eyebrow: 'استكشف العرض',
      heading: 'انظر ما يعمل في هذا التطبيق',
      description:
        'كل ميزة أدناه مباشرة — سجّل الدخول وانقر للاطلاع على BuildBase SDK في العمل الفعلي.',
      auth: {
        badge: 'المصادقة',
        title: 'تسجيل الدخول عبر OAuth، جاهز للاستخدام',
        description:
          'زر تسجيل الدخول أعلاه يستخدم BuildBase SDK — خطاف واحد، لا منطق للجلسة تحتاج كتابته. بعد تسجيل الدخول ستحصل على JWT وtoken مساحة عمل ودور تلقائياً.',
        tryLabel: 'سجّل الدخول لتجربته',
      },
      workspaces: {
        badge: 'مساحات العمل',
        title: 'محوّل مساحة العمل متعدد المستأجرين',
        description:
          'كل مستخدم يمكنه الانتماء لمساحات عمل متعددة بأدوار مختلفة. الشريط الجانبي في لوحة التحكم يُظهر مساحة عملك الحالية ويتيح التبديل بينها.',
        tryLabel: 'فتح لوحة التحكم',
      },
      credits: {
        badge: 'الاعتمادات',
        title: 'رصيد الاعتمادات المباشر واستهلاكها',
        description:
          'صفحة الاعتمادات تُظهر رصيدك المباشر، وتتيح شراء المزيد عبر نافذة مدمجة، وتحتوي أزرار اختبار تستدعي consumeCredits() في الوقت الفعلي.',
        tryLabel: 'تجربة استهلاك الاعتمادات',
      },
      notifications: {
        badge: 'الإشعارات',
        title: 'إشعارات المتصفح الفورية والبريد الإلكتروني',
        description:
          'صفحة الإشعارات تتيح الاشتراك في إشعارات المتصفح، وإنشاء إشعار بعنوان وأولوية وأزرار إجراء وتسليم مجدول — ثم إرساله مباشرةً.',
        tryLabel: 'إرسال إشعار تجريبي',
      },
      i18n: {
        badge: 'التدويل',
        title: '8 لغات بما فيها العربية RTL',
        description:
          'استخدم محوّل اللغة في الرأس للتبديل بين الإنجليزية والهندية والإسبانية والفرنسية والألمانية واليابانية والصينية والعربية — يتحول التخطيط تلقائياً إلى RTL.',
        tryLabel: 'التبديل إلى العربية',
      },
      content: {
        badge: 'المحتوى',
        title: 'مدونة MDX وسجل التغييرات، مدمجان',
        description:
          'المدونة وسجل التغييرات عبارة عن ملفات MDX تُترجَم وقت البناء عبر Contentlayer2. لا CMS، لا قاعدة بيانات — مجرد ملفات بـfrontmatter آمن من حيث الأنواع وبحث نصي كامل وRSS.',
        tryLabel: 'قراءة المدونة',
      },
      quotas: {
        badge: 'الحصص',
        title: 'استخدام الحصص مع بوابات الزيادة',
        description:
          'صفحة الاستخدام تستدعي useAllQuotaUsage() لعرض أشرطة تقدم لكل حصة. WhenQuotaExhausted تحجب الواجهة عند وصول الحصة للصفر؛ WhenQuotaOverage تُظهر تفاصيل الزيادة.',
        tryLabel: 'عرض استخدام الحصص',
      },
      permissions: {
        badge: 'الصلاحيات',
        title: 'مصفوفة الأذونات القائمة على الأدوار',
        description:
          'صفحة الأذونات تستخدم usePermissions() وWhenPermission لعرض كل أذونات المنصة كممنوحة أو مرفوضة بناءً على دورك في مساحة العمل الحالية في الوقت الفعلي.',
        tryLabel: 'التحقق من صلاحياتك',
      },
      events: {
        badge: 'الأحداث',
        title: 'تدفق أحداث SDK المباشر',
        description:
          'صفحة الأحداث تربط eventEmitter.setCallbacks() لالتقاط جميع أحداث SDK أثناء إطلاقها — تغييرات مساحة العمل، تحديثات المستخدم، تغييرات الدور — في سجل تمرير مباشر.',
        tryLabel: 'فتح سجل الأحداث',
      },
      userData: {
        badge: 'بيانات المستخدم',
        title: 'سمات المستخدم وعلامات الميزات',
        description:
          'صفحة الملف الشخصي تقرأ useUserAttributes() وuseUserFeatures() لعرض أزواج مفتاح-قيمة مخصصة وحالات علامات الميزات لكل مستخدم، وتتيح كتابة سمات جديدة مباشرةً.',
        tryLabel: 'عرض ملفك الشخصي',
      },
      invoices: {
        badge: 'الفواتير',
        title: 'سجل الفواتير وبوابة الفاتورة',
        description:
          'صفحة الفواتير تستدعي useInvoices() لسرد جميع فواتير Stripe بالحالة والمبلغ وروابط PDF. زر واحد يفتح بوابة عملاء Stripe عبر useBillingPortal().',
        tryLabel: 'عرض الفواتير',
      },
      seats: {
        badge: 'المقاعد',
        title: 'حدود المقاعد وبوابة الدعوات',
        description:
          'تستدعي لوحة التحكم useSeatStatus() لعرض عدد الأعضاء مقابل حدود الخطة في الوقت الفعلي. WhenNoSubscription وWhenSubscription وWhenSubscriptionToPlans تتحكم في الواجهة للجمهور المناسب.',
        tryLabel: 'فتح لوحة التحكم',
      },
      featureFlags: {
        badge: 'علامات الميزات',
        title: 'بوابات الميزات على مستوى مساحة العمل',
        description:
          'صفحة الملف الشخصي تستخدم WhenWorkspaceFeatureEnabled وWhenWorkspaceFeatureDisabled لتبديل المحتوى بناءً على علامات الميزات المكوّنة في لوحة تحكم BuildBase.',
        tryLabel: 'عرض بوابات الميزات',
      },
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
    trial: {
      endingSoon: 'تنتهي الفترة التجريبية قريباً',
      endingSoonMsg:
        'تنتهي فترتك التجريبية خلال {days} يوم. قم بالترقية الآن للاحتفاظ بالوصول.',
      upgrade: 'ترقية',
      freeTrial: 'أنت على فترة تجريبية مجانية',
      daysRemaining: '{days} يوم متبقٍ',
      endsOn: 'تنتهي الفترة التجريبية في {date}',
      active: 'الفترة التجريبية نشطة',
      viewPlans: 'عرض الخطط',
      trialBadge: 'تجريبي',
    },
    noSubscription: {
      title: 'لا يوجد اشتراك نشط',
      hint: 'اشترك لفتح الميزات المدفوعة',
      choosePlan: 'اختر خطة',
    },
    subscription: {
      title: 'الاشتراك',
      description: 'خطتك الحالية',
      loading: 'جاري التحميل...',
      status: 'الحالة: {status}',
      activeSubscription: 'اشتراك نشط',
      changePlan: 'تغيير الخطة',
      noPlan: 'لا توجد خطة نشطة',
      choosePlan: 'اختر خطة',
    },
    subscriptionGates: {
      whenSubscription: {
        title: 'بوابة الاشتراك',
        description: 'يظهر فقط عند وجود اشتراك نشط في مساحة العمل',
        fallback: 'لا يوجد اشتراك نشط — قم بالترقية لرؤية هذا المحتوى.',
        content: 'لديك اشتراك نشط — هذه البطاقة مرئية.',
      },
      whenSubscriptionToPlans: {
        title: 'بوابة الخطة',
        description: 'يظهر فقط عند الاشتراك في خطة محددة',
        fallback: 'لست في خطة Pro / Enterprise / Growth.',
        content:
          'أنت في خطة Pro أو Enterprise أو Growth — المحتوى المميز مفتوح.',
      },
    },
    seatStatus: {
      title: 'حالة المقاعد',
      description: 'عدد الأعضاء مقابل حدود الخطة',
      members: 'الأعضاء',
      includedSeats: 'المقاعد المشمولة',
      maxUsers: 'الحد الأقصى للمستخدمين',
      canInvite: 'يمكن الدعوة',
      yes: 'نعم',
      no: 'لا',
      limitReached:
        'تم الوصول لحد المقاعد — قم بترقية خطتك لدعوة المزيد من الأعضاء.',
    },
    quickActionButtons: {
      inviteTeam: 'دعوة الفريق',
      manageSubscription: 'إدارة الاشتراك',
      workspaceSettings: 'إعدادات مساحة العمل',
    },
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
  analytics: {
    title: 'التحليلات',
    description: 'مقاييس مساحة العمل المسحوبة مباشرة من BuildBase SDK',
    cards: {
      plan: 'الخطة',
      teamMembers: 'أعضاء الفريق',
      quotasTracked: 'الحصص المتتبعة',
      creditDebits: 'خصومات الاعتمادات',
      noSubscription: 'لا يوجد اشتراك',
      unlimitedSeats: 'مقاعد غير محدودة',
      maxSeats: '{n} حد أقصى للمقاعد',
      totalConsumed: '{n} وحدة إجمالية مستهلكة',
      consumptionEvents: 'أحداث استهلاك مسجلة',
    },
    quotaConsumption: {
      title: 'استهلاك الحصص',
      empty: 'لا توجد حصص مكوّنة لهذه مساحة العمل.',
    },
    featureFlags: {
      title: 'علامات ميزات مساحة العمل',
      empty: 'لا توجد علامات ميزات مكوّنة.',
    },
    planLimits: {
      title: 'حدود الخطة',
      empty: 'لا توجد حدود خطة مكوّنة.',
      unlimited: 'غير محدود',
    },
    loading: 'جاري التحميل…',
  },
  team: {
    title: 'الفريق',
    description: 'أعضاء مساحة العمل',
    inviteMember: 'دعوة عضو',
    seatLimitReached:
      'تم الوصول لحد المقاعد — قم بترقية خطتك لدعوة المزيد من الأعضاء.',
    cards: {
      members: 'الأعضاء',
      includedSeats: 'المقاعد المشمولة',
      maxUsers: 'الحد الأقصى للمستخدمين',
      availableSeats: 'المقاعد المتاحة',
    },
    memberList: {
      title: 'الأعضاء',
      count: '{count} عضو في هذه مساحة العمل',
      empty: 'لم يتم تحميل أعضاء. تأكد من تسجيل الدخول.',
      roleFallback: 'عضو',
    },
    manage: {
      title: 'إدارة الأعضاء',
      description: 'افتح لوحة إعدادات مساحة العمل لإدارة الأدوار والدعوات',
      openSettings: 'فتح إعدادات الأعضاء',
      permissions: 'الأذونات',
    },
  },
  settings: {
    title: 'الإعدادات',
    description: 'إعدادات مساحة العمل',
    card: {
      title: 'إعدادات مساحة العمل',
      description: 'انقر على أي قسم لفتح لوحة إعدادات BuildBase',
    },
    danger: {
      openButton: 'فتح منطقة الخطر',
    },
    sections: {
      profile: {
        label: 'الملف الشخصي',
        description: 'اسمك وصورتك الرمزية وتفاصيلك الشخصية',
      },
      general: {
        label: 'عام',
        description: 'اسم مساحة العمل والـslug والإعدادات الأساسية',
      },
      users: {
        label: 'الأعضاء والدعوات',
        description: 'إدارة أعضاء الفريق والأدوار والدعوات المعلقة',
      },
      subscription: {
        label: 'الاشتراك',
        description: 'عرض وتغيير خطتك الحالية',
      },
      usage: {
        label: 'الاستخدام',
        description: 'استهلاك الحصص وسجل الاستخدام',
      },
      credits: {
        label: 'الاعتمادات',
        description: 'رصيد الاعتمادات وخيارات الإضافة',
      },
      features: {
        label: 'علامات الميزات',
        description: 'تبديلات الميزات على مستوى مساحة العمل',
      },
      notifications: {
        label: 'الإشعارات',
        description: 'تفضيلات إشعارات البريد الإلكتروني والدفع',
      },
      permissions: {
        label: 'الأذونات',
        description: 'إعدادات التحكم في الوصول القائم على الأدوار',
      },
      danger: {
        label: 'منطقة الخطر',
        description: 'حذف مساحة العمل أو نقل الملكية',
      },
    },
  },
  documents: {
    title: 'المستندات',
    description: 'أقسام المستندات ذات البوابات',
    stats: {
      featureSections: 'أقسام الميزات',
      featureSectionsSubtitle: 'ميزات المستندات',
      enabled: 'مفعّل لمساحة العمل',
      enabledSubtitle: 'ميزات نشطة',
      locked: 'مقفل',
      lockedSubtitle: 'ميزات غير نشطة',
    },
    features: {
      enabled: 'مفعّل',
      disabled: 'معطّل',
    },
    allFeatures: {
      title: 'جميع ميزات مساحة العمل',
      description: 'حالة علامات الميزات الخام',
      empty: 'لا توجد علامات ميزات مكوّنة لهذه مساحة العمل.',
    },
    featureSections: {
      advancedExports: {
        label: 'التصدير المتقدم',
        description: 'تصدير المستندات كـPDF أو DOCX أو CSV',
        content: 'التصدير إلى PDF وWord وCSV متاح في خطتك.',
        lockedMessage: 'فعّل ميزة advanced-exports لفتح تصدير المستندات.',
      },
      documentSharing: {
        label: 'مشاركة المستندات',
        description: 'مشاركة المستندات مع المتعاونين الخارجيين',
        content: 'روابط المشاركة والوصول للمتعاونين الخارجيين مفعّلة.',
        lockedMessage:
          'فعّل document-sharing للسماح بالمشاركة مع أشخاص خارج مساحة عملك.',
      },
      eSignatures: {
        label: 'التوقيعات الإلكترونية',
        description: 'جمع التوقيعات الملزمة قانونياً',
        content:
          'جمع التوقيعات الإلكترونية نشط. أرسل طلبات التوقيع من أي مستند.',
        lockedMessage:
          'فعّل e-signatures لجمع التوقيعات الملزمة قانونياً على المستندات.',
      },
    },
  },
  events: {
    title: 'سجل أحداث SDK',
    description: 'أحداث SDK في الوقت الفعلي',
    clearButton: 'مسح',
    listenCard: {
      title: 'الاستماع للأحداث',
      description:
        'تُطلق هذه الأحداث تلقائياً أثناء استخدام SDK — بدّل مساحات العمل أو سجّل الدخول أو ادعُ عضواً لرؤيتها تظهر.',
    },
    liveCard: {
      title: 'البث المباشر',
      captured: '{count} حدث مُلتقط',
      empty: 'لا أحداث بعد. جرّب تبديل مساحات العمل أو تحديث الصفحة.',
    },
    eventLabels: {
      userCreated: 'مستخدم جديد',
      userUpdated: 'تحديث مستخدم',
      workspaceChanged: 'تغيير مساحة العمل',
      workspaceUpdated: 'تحديث مساحة العمل',
      memberAdded: 'إضافة عضو',
      memberRemoved: 'إزالة عضو',
      roleChanged: 'تغيير الدور',
      workspaceCreated: 'إنشاء مساحة عمل',
      workspaceDeleted: 'حذف مساحة عمل',
    },
  },
  invoices: {
    title: 'الفواتير',
    description: 'سجل الفواتير',
    refresh: 'تحديث',
    billingPortal: 'بوابة الفوترة',
    billingPortalOpening: 'جاري الفتح…',
    error: 'فشل تحميل الفواتير.',
    card: {
      title: 'سجل الفواتير',
      found: 'تم العثور على {count} فاتورة',
      empty:
        'لا توجد فواتير بعد. ستظهر الفواتير هنا بعد الاشتراك في خطة مدفوعة.',
    },
    table: {
      date: 'التاريخ',
      amount: 'المبلغ',
      status: 'الحالة',
      description: 'الوصف',
      links: 'الروابط',
      view: 'عرض',
      pdf: 'PDF',
      loadMore: 'تحميل المزيد',
    },
  },
  notifications: {
    title: 'اختبار الإشعارات',
    description: 'إرسال إشعارات تجريبية عبر BuildBase SDK',
    pushCard: {
      title: 'إشعارات الدفع للمتصفح',
      description: 'تفعيل إشعارات الدفع للمتصفح لهذا الجهاز',
      subscribed: 'مشترك',
      notSubscribed: 'غير مشترك',
      subscribe: 'اشتراك',
      unsubscribe: 'إلغاء الاشتراك',
    },
    sendCard: {
      title: 'إرسال إشعار تجريبي',
      description:
        'أكمل الحقول أدناه وأرسل إشعاراً. يتم حل وسوم الدمج مثل {{name}} و{{workspaceName}} و{{url}} تلقائياً.',
    },
    fields: {
      eventSlug: 'معرّف الحدث',
      eventSlugHint:
        'للدفع فقط: أي معرّف يعمل. للبريد الإلكتروني: يجب أن يطابق حدثاً مسجلاً.',
      title: 'العنوان',
      message: 'الرسالة',
      url: 'الرابط',
      target: 'الهدف',
      channel: 'القناة',
    },
    placeholders: {
      eventSlug: 'مثال: comment_added, deployment_success',
      title: 'عنوان الإشعار (يرجع لاسم الحدث إن لم يُدخل)',
      message: 'نص الدفع + رسالة البريد الإلكتروني',
      url: 'يُفتح عند النقر على الإشعار',
    },
    buttons: {
      meOnly: 'أنا فقط',
      allMembers: 'جميع أعضاء مساحة العمل',
      both: 'كلاهما',
      emailOnly: 'البريد الإلكتروني فقط',
      pushOnly: 'الدفع فقط',
      showAdvanced: 'إظهار خيارات الدفع المتقدمة',
      hideAdvanced: 'إخفاء خيارات الدفع المتقدمة',
      send: 'إرسال الإشعار',
      sending: 'جاري الإرسال...',
      silent: 'صامت',
      requireInteraction: 'يتطلب تفاعلاً',
      renotify: 'إعادة الإشعار',
      default: 'افتراضي',
    },
    advanced: {
      media: 'الوسائط',
      behavior: 'سلوك الدفع',
      delivery: 'التسليم',
      actions: 'أزرار الإجراءات (بحد أقصى 2)',
      iconUrl: 'رابط الأيقونة',
      imageUrl: 'رابط الصورة',
      badgeUrl: 'رابط الشارة',
      tag: 'الوسم',
      tagHint: 'يستبدل الإشعار بنفس الوسم بدلاً من التراكم',
      behaviorHint:
        'صامت = بدون صوت/اهتزاز. يتطلب تفاعلاً = يبقى حتى تفاعل المستخدم. إعادة الإشعار = صوت مجدداً عند الاستبدال بالوسم.',
      urgency: 'الأولوية',
      ttl: 'TTL (ثوانٍ)',
      schedule: 'الجدولة (ISO 8601)',
      action1: 'الإجراء 1',
      action2: 'الإجراء 2',
      actionTitlePlaceholder: 'تسمية الزر (مثال: رد)',
      actionKeyPlaceholder: 'مفتاح الإجراء (مثال: reply)',
      iconUrlPlaceholder: 'أيقونة الدفع (يرجع لأيقونة المؤسسة)',
      imageUrlPlaceholder: 'صورة كبيرة في نص الدفع',
      badgeUrlPlaceholder: 'أيقونة شريط الحالة (Android)',
      ttlPlaceholder: '86400 (افتراضي 24 ساعة)',
    },
    context: {
      workspace: 'مساحة العمل:',
      user: 'المستخدم:',
      none: 'لم يتم الاختيار',
    },
    resultCard: {
      title: 'الاستجابة',
    },
    toast: {
      workspaceRequired: 'يرجى اختيار مساحة عمل أولاً',
      sent: 'تم إرسال الإشعار لـ{count} مستخدم',
      notSent: 'لم يُرسل الإشعار: {reason}',
      pushEnabled: 'تم تفعيل إشعارات الدفع',
      pushDisabled: 'تم تعطيل إشعارات الدفع',
      pushFailed: 'فشل تبديل إشعارات الدفع',
      networkError: 'خطأ في الشبكة — تعذّر الوصول للخادم',
    },
  },
  permissions: {
    title: 'الأذونات',
    description: 'تحليل الأذونات المباشر',
    cards: {
      role: 'دورك',
      owner: 'مالك',
      ownerYes: 'نعم',
      ownerNo: 'لا',
      granted: 'الأذونات الممنوحة',
    },
    ownerAdmin: {
      title: 'مالك / مدير فقط',
      notVisible: 'غير مرئي لدورك ({role}).',
      visible: 'يمكنك رؤية هذا لأنك مالك أو مدير.',
    },
    allMembers: {
      title: 'جميع الأعضاء',
      notMember: 'لست عضواً في هذه مساحة العمل.',
      visible: 'يمكنك رؤية هذا لأنك عضو في مساحة العمل.',
    },
    matrix: {
      title: 'مصفوفة الأذونات',
      description: 'جميع أذونات المنصة مفحوصة مقابل دورك الحالي',
      denied: 'مرفوض',
      grantedStatus: 'ممنوح',
    },
  },
  profile: {
    title: 'ملف المستخدم',
    description: 'سمات المستخدم وعلامات الميزات',
    identity: {
      title: 'الهوية',
      subtitle: 'من useSaaSAuth()',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      role: 'الدور',
      id: 'المعرّف',
    },
    workspaceFeatures: {
      title: 'علامات ميزات مساحة العمل',
      enabled: 'مفعّل',
      disabled: 'معطّل',
    },
    attributes: {
      title: 'سمات المستخدم',
      description: 'أزواج مفتاح-قيمة مخصصة مخزنة لكل مستخدم',
      empty: 'لم يتم تعيين أي سمات بعد.',
      setTitle: 'تعيين سمة (عرض مباشر)',
      keyPlaceholder: 'مفتاح (مثال: theme)',
      valuePlaceholder: 'قيمة',
      saving: 'جاري الحفظ…',
      save: 'حفظ',
      saved: 'تم الحفظ!',
      failed: 'فشل الحفظ.',
    },
    userFeatures: {
      title: 'علامات ميزات المستخدم',
      description: 'علامات الميزات على مستوى المستخدم',
      empty: 'لا توجد علامات ميزات مكوّنة لهذا المستخدم.',
      loading: 'جاري التحميل...',
      enabled: 'مفعّل',
      disabled: 'معطّل',
    },
  },
  usage: {
    title: 'استخدام الحصص',
    description: 'استهلاك الحصص المباشر',
    loading: 'جاري تحميل الحصص...',
    error: 'فشل تحميل بيانات الحصص.',
    empty: 'لا توجد حصص مكوّنة لهذه مساحة العمل.',
    quotaCard: {
      remaining: '{count} متبقٍ',
      unlimited: 'غير محدود',
      exhausted: 'منتهية',
      overage: 'زيادة',
      threshold: 'تجاوز 80% ({pct}%) — يقترب من الحد',
      overageMsg: 'زيادة بمقدار {count} وحدة',
      exhaustedMsg: 'الحصة منتهية — الإجراءات التي تستخدم هذه الحصة محظورة',
      used: 'مستخدم',
      overageAllowed: '(مسموح)',
    },
    record: {
      title: 'تسجيل الاستخدام',
      description: 'تسجيل استخدام الحصة يدوياً',
      slugPlaceholder: 'معرّف الحصة (مثال: api_calls)',
      qtyPlaceholder: 'الكمية',
      recording: 'جاري التسجيل…',
      record: 'تسجيل',
      success: 'تم تسجيل {qty} وحدة لـ"{slug}".',
      failed: 'فشل تسجيل الاستخدام.',
    },
    logs: {
      title: 'سجل الاستخدام',
      description: 'أحدث سجلات الاستخدام',
      loading: 'جاري تحميل السجلات…',
      empty:
        'لا توجد سجلات استخدام بعد. سجّل بعض الاستخدام أدناه لرؤية السجلات.',
      table: {
        quota: 'الحصة',
        quantity: 'الكمية',
        source: 'المصدر',
        date: 'التاريخ',
      },
    },
  },
  creditStore: {
    title: 'حزم الاعتمادات',
    subtitle:
      'اشترِ اعتمادات لفتح الميزات المميزة مثل توليد AI والتصدير وغيرها.',
    buy: 'شراء اعتمادات',
    validFor: 'صالح لمدة {days} يوم',
    noExpiry: 'لا تنتهي أبداً',
    noPackages: 'لا توجد حزم اعتمادات متاحة حالياً.',
    error: 'فشل تحميل حزم الاعتمادات',
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
    credits: 'اعتمادات AI',
    creditsPerPeriod: 'اعتمادات / دورة',
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
    title: 'الاعتمادات',
    description:
      'استخدم الاعتمادات للإجراءات المميزة. أدر الحزم في إعدادات مساحة العمل.',
    balance: 'رصيد الاعتمادات',
    creditsAvailable: 'اعتمادات متاحة',
    manageCredits: 'إدارة الاعتمادات',
    buyCredits: 'شراء اعتمادات',
    choosePlan: 'اختر خطة',
    noCredits:
      'لا يوجد اعتمادات متبقية. اشترِ المزيد للاستمرار في استخدام الميزات المميزة.',
    buyMore: 'شراء اعتمادات',
    packages: {
      title: 'حزم الاعتمادات',
      loading: 'جاري تحميل الحزم…',
      error: 'فشل تحميل الحزم.',
      empty: 'لا توجد حزم اعتمادات مكوّنة بعد.',
      credits: 'اعتمادات',
      validFor: 'صالح لمدة {days} يوم',
      buyNow: 'اشترِ الآن',
    },
    testConsume: {
      title: 'اختبار استهلاك الاعتمادات',
      description: 'استخدم هذه الأزرار لاختبار استهلاك الاعتمادات من رصيدك.',
      use: 'استخدام {amount}',
      apiDescription: 'اختبار: استهلاك {amount} اعتماد',
      success: 'تم استهلاك {amount} اعتماد. الرصيد: {balance}',
      insufficient:
        'اعتمادات غير كافية. المتاح: {available}، المطلوب: {requested}',
    },
    lowCredits: {
      title: 'الرصيد منخفض',
      description: 'رصيد الاعتمادات لديك منخفض. قم بالشحن الآن لتجنب الانقطاع.',
    },
    expiring: {
      title: 'الاعتمادات قاربت على الانتهاء',
      description: 'الاعتمادات التي تنتهي صلاحيتها خلال 30 يومًا القادمة',
      expiresIn: 'تنتهي في {date}',
      noExpiring: 'لا توجد اعتمادات قاربت على الانتهاء',
      days: '{count} اعتماد',
      loading: 'جاري التحميل...',
    },
    transactions: {
      title: 'سجل المعاملات',
      description: 'أحدث إضافات وخصومات الاعتمادات',
      empty: 'لا توجد معاملات بعد',
      loading: 'جاري التحميل...',
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
    blogNotFound: {
      title: 'المقالة غير موجودة',
      description:
        'المقالة التي تبحث عنها غير موجودة، ربما تم حذفها، أو غير متوفرة بلغتك.',
      browseAll: 'تصفح جميع المقالات',
    },
  },
  blog: {
    label: 'المدونة',
    heading: 'أحدث المقالات',
    description: 'تحديثات ودروس ورؤى من فريقنا.',
    noPosts: 'لا توجد مقالات بعد. تحقق مرة أخرى قريباً!',
    noPostsTag: 'لا توجد مقالات بهذا الوسم بعد.',
    noPostsCategory: 'لا توجد مقالات في هذه الفئة بعد.',
    noPostsAuthor: 'لا توجد مقالات لهذا المؤلف بعد.',
    postsByAuthor: 'مقالات {name}',
    postsTaggedCount: '{count} مقالة بوسم "{tag}"',
    postsInCategoryCount: '{count} مقالة في هذه الفئة',
    readMore: 'اقرأ المزيد',
    read: 'اقرأ',
    allPosts: '← جميع المقالات',
    previous: 'السابق',
    next: 'التالي',
    pageOf: 'صفحة {page} من {total}',
    relatedPosts: 'مقالات ذات صلة',
    share: 'مشاركة',
    rssLabel: 'خلاصة RSS',
    shareAriaX: 'مشاركة على X / تويتر',
    shareAriaLinkedin: 'مشاركة على LinkedIn',
    shareAriaFacebook: 'مشاركة على Facebook',
    shareAriaCopy: 'نسخ الرابط',
    shareAriaCopied: 'تم نسخ الرابط!',
    search: {
      trigger: 'البحث في المقالات...',
      placeholder: 'البحث في المدونة...',
      searching: 'جاري البحث...',
      noResults: 'لا نتائج لـ "{query}"',
      startTyping: 'ابدأ الكتابة للبحث...',
    },
    meta: {
      title: 'المدونة',
      titlePage: 'المدونة — الصفحة {page}',
      description: 'أحدث المقالات والدروس والتحديثات من فريقنا.',
      tagTitle: 'مقالات بوسم "{tag}"',
      tagDescription: 'جميع مقالات المدونة بوسم "{tag}".',
      categoryTitle: '{category} — المدونة',
      categoryDescription: 'مقالات المدونة في فئة "{category}".',
    },
  },
  changelog: {
    label: 'سجل التغييرات',
    heading: 'الجديد',
    description: 'جميع آخر التحديثات والتحسينات والإصلاحات.',
    rssLabel: 'خلاصة RSS',
    permalink: 'رابط دائم',
    meta: {
      title: 'سجل التغييرات',
      description: 'جميع آخر التحديثات والتحسينات والإصلاحات.',
    },
  },
  cookieConsent: {
    title: 'نستخدم ملفات تعريف الارتباط',
    descriptionBefore:
      'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور وتخصيص المحتوى. يمكنك اختيار ملفات تعريف الارتباط التي تسمح بها. اقرأ',
    policyLinkPrivacy: 'سياسة الخصوصية',
    policyLinkCookie: 'سياسة ملفات تعريف الارتباط',
    dismissAriaLabel: 'تجاهل الآن',
    necessary: {
      title: 'ضروري',
      description: 'مطلوب لعمل الموقع. لا يمكن تعطيله.',
    },
    analytics: {
      title: 'تحليلات',
      description: 'يساعدنا على فهم كيفية استخدام الزوار لموقعنا.',
    },
    marketing: {
      title: 'تسويق',
      description: 'يُستخدم لعرض إعلانات ذات صلة وتتبع الحملات.',
    },
    acceptAll: 'قبول الكل',
    rejectAll: 'رفض الكل',
    savePreferences: 'حفظ التفضيلات',
    customize: 'تخصيص',
  },
};

export default messages;
