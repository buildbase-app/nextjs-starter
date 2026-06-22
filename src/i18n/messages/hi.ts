import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      documents: 'दस्तावेज़',
      analytics: 'विश्लेषण',
      team: 'टीम',
      notifications: 'सूचनाएं',
      settings: 'सेटिंग्स',
      menu: 'मेनू',
      selectWorkspace: 'वर्कस्पेस चुनें',
      profile: 'प्रोफ़ाइल',
      manageWorkspace: 'वर्कस्पेस प्रबंधित करें',
      generalSettings: 'सामान्य सेटिंग्स',
      userManagement: 'उपयोगकर्ता प्रबंधन',
      billingPayments: 'बिलिंग और भुगतान',
      credits: 'क्रेडिट',
      creditUsage: 'क्रेडिट उपयोग',
      creditsAvailable: 'उपलब्ध',
      usage: 'उपयोग',
      permissions: 'अनुमतियां',
      events: 'घटनाएं',
      invoices: 'चालान',
      workspace: 'वर्कस्पेस',
    },
    buttons: {
      signIn: 'साइन इन करें',
      signOut: 'साइन आउट करें',
      submit: 'सबमिट करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      create: 'बनाएं',
      loading: 'लोड हो रहा है...',
    },
    auth: {
      signInPrompt: 'जारी रखने के लिए कृपया साइन इन करें',
      signOutConfirm: 'क्या आप वाकई साइन आउट करना चाहते हैं?',
    },
    footer: {
      rights: 'सर्वाधिकार सुरक्षित',
      tagline:
        'एक लाइव डेमो ऐप जो BuildBase SDK को काम करते हुए दिखाता है। साइन इन करें और प्रमाणीकरण, वर्कस्पेस, क्रेडिट, पुश नोटिफिकेशन और i18n को एक्सप्लोर करें।',
      sections: {
        product: 'उत्पाद',
        resources: 'संसाधन',
        legal: 'कानूनी',
      },
      links: {
        features: 'सुविधाएं',
        pricing: 'मूल्य निर्धारण',
        dashboard: 'डैशबोर्ड',
        credits: 'क्रेडिट',
        blog: 'ब्लॉग',
        changelog: 'परिवर्तन लॉग',
        about: 'हमारे बारे में',
        privacy: 'गोपनीयता नीति',
        terms: 'सेवा की शर्तें',
      },
    },
    language: {
      select: 'भाषा चुनें',
      current: 'वर्तमान भाषा',
    },
    accessibility: {
      skipToContent: 'सामग्री पर जाएं',
    },
    theme: {
      toggle: 'थीम बदलें',
      light: 'हल्का',
      dark: 'गहरा',
      system: 'सिस्टम',
    },
    pages: {
      lastUpdated: 'अंतिम अपडेट:',
    },
    redirecting: 'रीडायरेक्ट हो रहा है...',
  },
  home: {
    title: 'मेरा ऐप',
    hero: {
      badge: 'BuildBase SDK · लाइव डेमो',
      heading:
        'A working demo built with the <highlight>BuildBase SDK</highlight>',
      description:
        'साइन इन करके देखें — प्रमाणीकरण, मल्टी-टेनेंट वर्कस्पेस, क्रेडिट बिलिंग, पुश नोटिफिकेशन और 8 भाषाओं में i18n — सब एक असली ऐप में BuildBase SDK द्वारा संचालित।',
      signInToExplore: 'साइन इन करके देखें',
      openDashboard: 'डैशबोर्ड खोलें',
      viewSource: 'सोर्स देखें',
      builtWith: 'इनके साथ बनाया',
    },
    stats: {
      languages: {
        label: 'इस डेमो में भाषाएं',
        sublabel: 'हेडर टॉगल से बदलें',
      },
      sdkFeatures: {
        label: 'लाइव SDK सुविधाएं',
        sublabel: 'हर सुविधा का डेमो पेज है',
      },
      notifications: {
        label: 'नोटिफिकेशन चैनल',
        sublabel: 'ब्राउज़र पुश + ईमेल',
      },
      authCode: {
        label: 'प्रमाणीकरण कोड की लाइनें',
        sublabel: 'SDK सब संभालता है',
      },
    },
    cta: {
      heading: 'सब कुछ काम करता देखना चाहते हैं?',
      description:
        'साइन इन करें और पूरा डैशबोर्ड खोलें — वर्कस्पेस बदलें, क्रेडिट उपयोग करें, पुश नोटिफिकेशन भेजें और सभी 8 भाषाओं में स्विच करें।',
      signIn: 'साइन इन करें और देखें',
      openDashboard: 'डैशबोर्ड खोलें',
      howBuilt: 'कैसे बनाया गया',
    },
    features: {
      eyebrow: 'डेमो देखें',
      heading: 'इस ऐप में क्या काम कर रहा है',
      description:
        'नीचे हर सुविधा लाइव है — साइन इन करें और BuildBase SDK को काम करते हुए देखें।',
      auth: {
        badge: 'प्रमाणीकरण',
        title: 'OAuth साइन-इन, बिना किसी झंझट के',
        description:
          'ऊपर का साइन इन बटन BuildBase SDK का उपयोग करता है — एक हुक, कोई सेशन लॉजिक नहीं। साइन इन के बाद आपको JWT, वर्कस्पेस टोकन और रोल अपने आप मिलते हैं।',
        tryLabel: 'साइन इन करके देखें',
      },
      workspaces: {
        badge: 'वर्कस्पेस',
        title: 'मल्टी-टेनेंट वर्कस्पेस स्विचर',
        description:
          'हर उपयोगकर्ता अलग-अलग रोल के साथ कई वर्कस्पेस में हो सकता है। डैशबोर्ड साइडबार आपका मौजूदा वर्कस्पेस दिखाता है और उनके बीच स्विच करने देता है।',
        tryLabel: 'डैशबोर्ड खोलें',
      },
      credits: {
        badge: 'क्रेडिट',
        title: 'लाइव क्रेडिट बैलेंस और उपयोग',
        description:
          'क्रेडिट पेज आपका लाइव बैलेंस दिखाता है, बिल्ट-इन मोडल से और खरीदने देता है, और SDK के consumeCredits() को रियल-टाइम में टेस्ट करने के बटन हैं।',
        tryLabel: 'क्रेडिट उपयोग देखें',
      },
      notifications: {
        badge: 'नोटिफिकेशन',
        title: 'ब्राउज़र पुश और ईमेल डिलीवरी',
        description:
          'नोटिफिकेशन पेज से अपने ब्राउज़र को सब्सक्राइब करें, शीर्षक, प्राथमिकता, एक्शन बटन और शेड्यूल के साथ नोटिफिकेशन बनाएं — फिर सीधे भेजें।',
        tryLabel: 'टेस्ट नोटिफिकेशन भेजें',
      },
      i18n: {
        badge: 'i18n',
        title: 'अरबी RTL सहित 8 भाषाएं',
        description:
          'हेडर में भाषा स्विचर से अंग्रेज़ी, हिंदी, स्पेनिश, फ्रेंच, जर्मन, जापानी, चीनी और अरबी के बीच स्विच करें — लेआउट अपने आप RTL में बदल जाता है।',
        tryLabel: 'अरबी में बदलें',
      },
      content: {
        badge: 'कंटेंट',
        title: 'MDX ब्लॉग और चेंजलॉग, बिल्ट-इन',
        description:
          'ब्लॉग और चेंजलॉग MDX फ़ाइलें हैं जो Contentlayer2 के ज़रिए बिल्ड टाइम पर कंपाइल होती हैं। कोई CMS नहीं, कोई डेटाबेस नहीं — सिर्फ टाइप-सेफ frontmatter, फुल-टेक्स्ट सर्च और RSS वाली फ़ाइलें।',
        tryLabel: 'ब्लॉग पढ़ें',
      },
      quotas: {
        badge: 'कोटा',
        title: 'कोटा उपयोग और ओवरेज गेट्स',
        description:
          'उपयोग पेज useAllQuotaUsage() कॉल करता है और हर कोटा की प्रोग्रेस बार दिखाता है। WhenQuotaExhausted कोटा ज़ीरो होने पर UI ब्लॉक करता है; WhenQuotaOverage ओवरेज विवरण दिखाता है।',
        tryLabel: 'कोटा उपयोग देखें',
      },
      permissions: {
        badge: 'अनुमतियां',
        title: 'भूमिका-आधारित अनुमति मैट्रिक्स',
        description:
          'अनुमतियां पेज usePermissions() और WhenPermission का उपयोग करता है और आपके मौजूदा वर्कस्पेस रोल के आधार पर हर प्लेटफॉर्म अनुमति को रियल-टाइम में स्वीकृत या अस्वीकृत के रूप में दिखाता है।',
        tryLabel: 'अपनी अनुमतियां देखें',
      },
      events: {
        badge: 'इवेंट',
        title: 'लाइव SDK इवेंट स्ट्रीम',
        description:
          'इवेंट पेज eventEmitter.setCallbacks() को वायर करता है और सभी SDK इवेंट कैप्चर करता है — वर्कस्पेस बदलाव, यूज़र अपडेट, रोल बदलाव — एक लाइव स्क्रॉलिंग लॉग में।',
        tryLabel: 'इवेंट लॉग खोलें',
      },
      userData: {
        badge: 'यूज़र डेटा',
        title: 'यूज़र एट्रिब्यूट और फीचर फ्लैग',
        description:
          'प्रोफ़ाइल पेज useUserAttributes() और useUserFeatures() पढ़ता है और कस्टम की-वैल्यू जोड़े और प्रति-यूज़र फीचर फ्लैग स्थितियां दिखाता है, और लाइव नए एट्रिब्यूट लिखने देता है।',
        tryLabel: 'अपनी प्रोफ़ाइल देखें',
      },
      invoices: {
        badge: 'इनवॉइस',
        title: 'इनवॉइस इतिहास और बिलिंग पोर्टल',
        description:
          'इनवॉइस पेज useInvoices() कॉल करता है और सभी Stripe इनवॉइस स्टेटस, राशि और PDF लिंक के साथ सूचीबद्ध करता है। एक बटन useBillingPortal() के ज़रिए Stripe कस्टमर पोर्टल खोलता है।',
        tryLabel: 'इनवॉइस देखें',
      },
      seats: {
        badge: 'सीटें',
        title: 'सीट सीमा और इनवाइट गेटिंग',
        description:
          'डैशबोर्ड useSeatStatus() कॉल करता है और रियल-टाइम में मेम्बर काउंट बनाम प्लान सीमाएं दिखाता है। WhenNoSubscription, WhenSubscription और WhenSubscriptionToPlans सही ऑडियंस के लिए UI नियंत्रित करते हैं।',
        tryLabel: 'डैशबोर्ड खोलें',
      },
      featureFlags: {
        badge: 'फीचर फ्लैग',
        title: 'वर्कस्पेस-स्तरीय फीचर गेट्स',
        description:
          'प्रोफ़ाइल पेज WhenWorkspaceFeatureEnabled और WhenWorkspaceFeatureDisabled का उपयोग करता है और BuildBase डैशबोर्ड में कॉन्फ़िगर किए गए वर्कस्पेस-स्तरीय फीचर फ्लैग के आधार पर कंटेंट टॉगल करता है।',
        tryLabel: 'फीचर गेट्स देखें',
      },
    },
    meta: {
      title: 'मेरा ऐप',
      description: 'shadcn/ui और थीम सपोर्ट के साथ मेरा Next.js ऐप',
      tagline: 'कुछ शानदार बनाएं',
    },
  },
  dashboard: {
    title: 'डैशबोर्ड',
    welcome: 'वापस आने पर स्वागत है, {name}!',
    trial: {
      endingSoon: 'ट्रायल जल्द समाप्त होगा',
      endingSoonMsg:
        'आपका ट्रायल {days} दिन में समाप्त होता है। एक्सेस बनाए रखने के लिए अभी अपग्रेड करें।',
      upgrade: 'अपग्रेड करें',
      freeTrial: 'आप ट्रायल अवधि में हैं',
      daysRemaining: '{days} दिन शेष',
      endsOn: 'ट्रायल {date} को समाप्त होता है',
      active: 'ट्रायल सक्रिय',
      viewPlans: 'प्लान देखें',
      trialBadge: 'ट्रायल',
    },
    noSubscription: {
      title: 'कोई सक्रिय सदस्यता नहीं',
      hint: 'भुगतान सुविधाओं को अनलॉक करने के लिए सदस्यता लें',
      choosePlan: 'प्लान चुनें',
    },
    subscription: {
      title: 'सदस्यता',
      description: 'आपका वर्तमान प्लान',
      loading: 'लोड हो रहा है...',
      status: 'स्थिति: {status}',
      activeSubscription: 'सक्रिय सदस्यता',
      changePlan: 'प्लान बदलें',
      noPlan: 'कोई सक्रिय प्लान नहीं',
      choosePlan: 'प्लान चुनें',
    },
    subscriptionGates: {
      whenSubscription: {
        title: 'सदस्यता गेट',
        description: 'केवल सक्रिय सदस्यता के साथ दृश्यमान',
        fallback:
          'कोई सक्रिय सदस्यता नहीं — यह सामग्री देखने के लिए अपग्रेड करें।',
        content: 'आपकी सक्रिय सदस्यता है — यह कार्ड दृश्यमान है।',
      },
      whenSubscriptionToPlans: {
        title: 'प्लान गेट',
        description: 'केवल विशिष्ट प्लान के साथ दृश्यमान',
        fallback: 'आप Pro / Enterprise / Growth प्लान पर नहीं हैं।',
        content:
          'आप Pro, Enterprise या Growth पर हैं — प्रीमियम सामग्री अनलॉक।',
      },
    },
    seatStatus: {
      title: 'सीट स्थिति',
      description: 'सदस्य बनाम प्लान सीमाएं',
      members: 'सदस्य',
      includedSeats: 'शामिल सीटें',
      maxUsers: 'अधिकतम उपयोगकर्ता',
      canInvite: 'आमंत्रित कर सकते हैं',
      yes: 'हां',
      no: 'नहीं',
      limitReached:
        'सीट सीमा पहुंच गई — अधिक सदस्यों को आमंत्रित करने के लिए अपने प्लान को अपग्रेड करें।',
    },
    quickActionButtons: {
      inviteTeam: 'टीम आमंत्रित करें',
      manageSubscription: 'सदस्यता प्रबंधित करें',
      workspaceSettings: 'वर्कस्पेस सेटिंग्स',
    },
    cards: {
      workspace: {
        title: 'वर्तमान वर्कस्पेस',
        empty: 'कोई वर्कस्पेस नहीं चुना',
      },
      role: {
        title: 'आपकी भूमिका',
        empty: 'N/A',
      },
      email: {
        title: 'ईमेल पता',
      },
      status: {
        title: 'स्थिति',
        active: 'सक्रिय',
        inactive: 'निष्क्रिय',
      },
    },
    quickActions: {
      title: 'त्वरित कार्रवाई',
      createProject: 'प्रोजेक्ट बनाएं',
      viewReports: 'रिपोर्ट देखें',
      inviteTeam: 'टीम सदस्य आमंत्रित करें',
    },
    pages: {
      documents: {
        title: 'दस्तावेज़',
        description: 'अपने दस्तावेज़ प्रबंधित करें',
        placeholder: 'दस्तावेज़ सामग्री यहां आती है।',
      },
      analytics: {
        title: 'विश्लेषण',
        description: 'अपने विश्लेषण देखें',
        placeholder: 'विश्लेषण सामग्री यहां आती है।',
      },
      team: {
        title: 'टीम',
        description: 'अपनी टीम प्रबंधित करें',
        placeholder: 'टीम प्रबंधन सामग्री यहां आती है।',
      },
      settings: {
        title: 'सेटिंग्स',
        description: 'अपनी सेटिंग्स प्रबंधित करें',
        placeholder: 'सेटिंग्स सामग्री यहां आती है।',
      },
    },
  },
  analytics: {
    title: 'विश्लेषण',
    description: 'रियल-टाइम वर्कस्पेस मेट्रिक्स',
    cards: {
      plan: 'प्लान',
      teamMembers: 'टीम सदस्य',
      quotasTracked: 'ट्रैक किए गए कोटा',
      creditDebits: 'क्रेडिट डेबिट',
      noSubscription: 'कोई सदस्यता नहीं',
      unlimitedSeats: 'असीमित सीटें',
      maxSeats: '{n} सीटें अधिकतम',
      totalConsumed: 'कुल {n} इकाइयां उपभोग की गईं',
      consumptionEvents: 'उपभोग घटनाएं रिकॉर्ड की गईं',
    },
    quotaConsumption: {
      title: 'कोटा उपभोग',
      empty: 'इस वर्कस्पेस के लिए कोई कोटा कॉन्फ़िगर नहीं।',
    },
    featureFlags: {
      title: 'फ़ीचर फ़्लैग',
      empty: 'कोई फ़्लैग कॉन्फ़िगर नहीं।',
    },
    planLimits: {
      title: 'प्लान सीमाएं',
      empty: 'कोई प्लान सीमाएं कॉन्फ़िगर नहीं।',
      unlimited: 'असीमित',
    },
    loading: 'लोड हो रहा है…',
  },
  team: {
    title: 'टीम',
    description: 'वर्कस्पेस सदस्य',
    inviteMember: 'सदस्य आमंत्रित करें',
    seatLimitReached:
      'सीट सीमा पहुंच गई — अधिक सदस्यों को आमंत्रित करने के लिए अपना प्लान अपग्रेड करें।',
    cards: {
      members: 'सदस्य',
      includedSeats: 'शामिल सीटें',
      maxUsers: 'अधिकतम उपयोगकर्ता',
      availableSeats: 'उपलब्ध सीटें',
    },
    memberList: {
      title: 'सदस्य',
      count: 'इस वर्कस्पेस में {count} सदस्य',
      empty: 'कोई सदस्य लोड नहीं हुए। सुनिश्चित करें कि आप प्रमाणित हैं।',
      roleFallback: 'सदस्य',
    },
    manage: {
      title: 'सदस्य प्रबंधित करें',
      description:
        'भूमिकाएं और आमंत्रण प्रबंधित करने के लिए सेटिंग्स पैनल खोलें',
      openSettings: 'सदस्य सेटिंग्स खोलें',
      permissions: 'अनुमतियां',
    },
  },
  settings: {
    title: 'सेटिंग्स',
    description: 'वर्कस्पेस कॉन्फ़िगरेशन',
    card: {
      title: 'वर्कस्पेस सेटिंग्स',
      description: 'सेटिंग्स पैनल खोलने के लिए किसी भी अनुभाग पर क्लिक करें',
    },
    danger: {
      openButton: 'खतरे का ज़ोन खोलें',
    },
    sections: {
      profile: {
        label: 'प्रोफ़ाइल',
        description: 'आपका नाम, अवतार और व्यक्तिगत डेटा',
      },
      general: {
        label: 'सामान्य',
        description: 'वर्कस्पेस नाम, स्लग और बुनियादी कॉन्फ़िगरेशन',
      },
      users: {
        label: 'सदस्य और आमंत्रण',
        description: 'टीम सदस्य, भूमिकाएं और लंबित आमंत्रण प्रबंधित करें',
      },
      subscription: {
        label: 'सदस्यता',
        description: 'अपना वर्तमान प्लान देखें और बदलें',
      },
      usage: {
        label: 'उपयोग',
        description: 'कोटा उपभोग और उपयोग इतिहास',
      },
      credits: {
        label: 'क्रेडिट',
        description: 'क्रेडिट बैलेंस और रिचार्ज विकल्प',
      },
      features: {
        label: 'फ़ीचर फ़्लैग',
        description: 'वर्कस्पेस सुविधाएं सक्षम/अक्षम करें',
      },
      notifications: {
        label: 'सूचनाएं',
        description: 'ईमेल और पुश सूचना प्राथमिकताएं',
      },
      permissions: {
        label: 'अनुमतियां',
        description: 'भूमिका-आधारित एक्सेस नियंत्रण कॉन्फ़िगरेशन',
      },
      danger: {
        label: 'खतरे का ज़ोन',
        description: 'वर्कस्पेस हटाएं या स्वामित्व स्थानांतरित करें',
      },
    },
  },
  documents: {
    title: 'दस्तावेज़',
    description: 'फ़ीचर नियंत्रण के साथ दस्तावेज़ अनुभाग',
    stats: {
      featureSections: 'फ़ीचर अनुभाग',
      featureSectionsSubtitle: 'दस्तावेज़ सुविधाएं',
      enabled: 'वर्कस्पेस के लिए सक्षम',
      enabledSubtitle: 'सक्रिय सुविधाएं',
      locked: 'लॉक',
      lockedSubtitle: 'निष्क्रिय सुविधाएं',
    },
    features: {
      enabled: 'सक्षम',
      disabled: 'अक्षम',
    },
    allFeatures: {
      title: 'सभी वर्कस्पेस सुविधाएं',
      description: 'सभी फ़्लैग की स्थिति',
      empty: 'इस वर्कस्पेस के लिए कोई फ़ीचर फ़्लैग कॉन्फ़िगर नहीं।',
    },
    featureSections: {
      advancedExports: {
        label: 'उन्नत निर्यात',
        description: 'दस्तावेज़ PDF, DOCX या CSV के रूप में निर्यात करें',
        content: 'आपके प्लान में PDF, Word और CSV निर्यात उपलब्ध है।',
        lockedMessage:
          'निर्यात अनलॉक करने के लिए उन्नत निर्यात सुविधा सक्षम करें।',
      },
      documentSharing: {
        label: 'दस्तावेज़ साझाकरण',
        description: 'बाहरी सहयोगियों के साथ दस्तावेज़ साझा करें',
        content: 'शेयर लिंक और बाहरी सहयोगी एक्सेस सक्षम है।',
        lockedMessage:
          'बाहरी एक्सेस की अनुमति देने के लिए दस्तावेज़ साझाकरण सक्षम करें।',
      },
      eSignatures: {
        label: 'इलेक्ट्रॉनिक हस्ताक्षर',
        description: 'कानूनी रूप से बाध्यकारी हस्ताक्षर एकत्र करें',
        content: 'इलेक्ट्रॉनिक हस्ताक्षर संग्रह सक्रिय है।',
        lockedMessage:
          'दस्तावेज़ों पर हस्ताक्षर एकत्र करने के लिए ई-सिग्नेचर सक्षम करें।',
      },
    },
  },
  events: {
    title: 'SDK इवेंट लॉग',
    description: 'रियल-टाइम SDK घटनाएं',
    clearButton: 'साफ़ करें',
    listenCard: {
      title: 'घटनाएं सुन रहे हैं',
      description:
        'ये घटनाएं SDK उपयोग पर स्वचालित रूप से ट्रिगर होती हैं — वर्कस्पेस बदलें, साइन इन करें या सदस्य आमंत्रित करें।',
    },
    liveCard: {
      title: 'लाइव स्ट्रीम',
      captured: '{count} घटनाएं कैप्चर की गईं',
      empty:
        'अभी कोई घटना नहीं। वर्कस्पेस बदलने या पेज रीलोड करने का प्रयास करें।',
    },
    eventLabels: {
      userCreated: 'उपयोगकर्ता बनाया गया',
      userUpdated: 'उपयोगकर्ता अपडेट किया गया',
      workspaceChanged: 'वर्कस्पेस बदला गया',
      workspaceUpdated: 'वर्कस्पेस अपडेट किया गया',
      memberAdded: 'सदस्य जोड़ा गया',
      memberRemoved: 'सदस्य हटाया गया',
      roleChanged: 'भूमिका बदली गई',
      workspaceCreated: 'वर्कस्पेस बनाया गया',
      workspaceDeleted: 'वर्कस्पेस हटाया गया',
    },
  },
  invoices: {
    title: 'चालान',
    description: 'बिलिंग इतिहास',
    refresh: 'रीफ्रेश करें',
    billingPortal: 'बिलिंग पोर्टल',
    billingPortalOpening: 'खुल रहा है…',
    error: 'चालान लोड करने में त्रुटि।',
    card: {
      title: 'चालान इतिहास',
      found: '{count} चालान मिले',
      empty:
        'अभी कोई चालान नहीं। भुगतान प्लान की सदस्यता के बाद चालान यहां दिखाई देंगे।',
    },
    table: {
      date: 'दिनांक',
      amount: 'राशि',
      status: 'स्थिति',
      description: 'विवरण',
      links: 'लिंक',
      view: 'देखें',
      pdf: 'PDF',
      loadMore: 'और लोड करें',
    },
  },
  notifications: {
    title: 'सूचना परीक्षण',
    description: 'BuildBase SDK के माध्यम से परीक्षण सूचनाएं भेजें',
    pushCard: {
      title: 'ब्राउज़र पुश सूचनाएं',
      description: 'इस डिवाइस के लिए ब्राउज़र पुश सूचनाएं सक्षम करें',
      subscribed: 'सदस्य',
      notSubscribed: 'सदस्य नहीं',
      subscribe: 'सदस्यता लें',
      unsubscribe: 'सदस्यता रद्द करें',
    },
    sendCard: {
      title: 'परीक्षण सूचना भेजें',
      description:
        'फ़ील्ड भरें और सूचना भेजें। {{name}}, {{workspaceName}}, {{url}} लेबल स्वचालित रूप से हल होते हैं।',
    },
    fields: {
      eventSlug: 'इवेंट स्लग',
      eventSlugHint:
        'केवल Push: कोई भी स्लग काम करता है। Email के लिए: पंजीकृत इवेंट से मेल खाना चाहिए।',
      title: 'शीर्षक',
      message: 'संदेश',
      url: 'URL',
      target: 'प्राप्तकर्ता',
      channel: 'चैनल',
    },
    placeholders: {
      eventSlug: 'जैसे comment_added, deployment_success',
      title: 'सूचना शीर्षक',
      message: 'Push बॉडी + ईमेल संदेश',
      url: 'Push क्लिक पर खुलता है',
    },
    buttons: {
      meOnly: 'केवल मैं',
      allMembers: 'सभी वर्कस्पेस सदस्य',
      both: 'दोनों',
      emailOnly: 'केवल ईमेल',
      pushOnly: 'केवल Push',
      showAdvanced: 'उन्नत Push विकल्प दिखाएं',
      hideAdvanced: 'उन्नत Push विकल्प छुपाएं',
      send: 'सूचना भेजें',
      sending: 'भेजा जा रहा है...',
      silent: 'साइलेंट',
      requireInteraction: 'इंटरैक्शन आवश्यक',
      renotify: 'पुनः सूचित करें',
      default: 'डिफ़ॉल्ट',
    },
    advanced: {
      media: 'मीडिया',
      behavior: 'Push व्यवहार',
      delivery: 'डिलीवरी',
      actions: 'एक्शन बटन (अधिकतम 2)',
      iconUrl: 'आइकन URL',
      imageUrl: 'छवि URL',
      badgeUrl: 'बैज URL',
      tag: 'टैग',
      tagHint: 'स्टैक करने के बजाय एक ही टैग वाली सूचना बदलें',
      behaviorHint:
        'साइलेंट = कोई ध्वनि नहीं। इंटरैक्शन आवश्यक = उपयोगकर्ता एक्शन तक रहे। पुनः सूचित = बदलने पर ध्वनि।',
      urgency: 'तात्कालिकता',
      ttl: 'TTL (सेकंड)',
      schedule: 'शेड्यूल करें (ISO 8601)',
      action1: 'एक्शन 1',
      action2: 'एक्शन 2',
      actionTitlePlaceholder: 'बटन लेबल (जैसे Reply)',
      actionKeyPlaceholder: 'एक्शन कुंजी (जैसे reply)',
      iconUrlPlaceholder: 'Push आइकन (संगठन आइकन पर वापस जाता है)',
      imageUrlPlaceholder: 'Push बॉडी में बड़ी छवि',
      badgeUrlPlaceholder: 'स्टेटस बार आइकन (Android)',
      ttlPlaceholder: '86400 (डिफ़ॉल्ट 24 घंटे)',
    },
    context: {
      workspace: 'वर्कस्पेस:',
      user: 'उपयोगकर्ता:',
      none: 'कोई नहीं चुना',
    },
    resultCard: {
      title: 'प्रतिक्रिया',
    },
    toast: {
      workspaceRequired: 'पहले एक वर्कस्पेस चुनें',
      sent: '{count} उपयोगकर्ता(ओं) को सूचना भेजी गई',
      notSent: 'सूचना नहीं भेजी गई: {reason}',
      pushEnabled: 'Push सूचनाएं सक्षम',
      pushDisabled: 'Push सूचनाएं अक्षम',
      pushFailed: 'Push सूचनाएं बदलने में त्रुटि',
      networkError: 'नेटवर्क त्रुटि — सर्वर से कनेक्ट नहीं हो सका',
    },
  },
  permissions: {
    title: 'अनुमतियां',
    description: 'रियल-टाइम अनुमति समाधान',
    cards: {
      role: 'आपकी भूमिका',
      owner: 'स्वामी',
      ownerYes: 'हां',
      ownerNo: 'नहीं',
      granted: 'दी गई अनुमतियां',
    },
    ownerAdmin: {
      title: 'केवल स्वामी / व्यवस्थापक',
      notVisible: 'आपकी भूमिका ({role}) के लिए दृश्यमान नहीं।',
      visible: 'आप यह देख सकते हैं क्योंकि आप स्वामी या व्यवस्थापक हैं।',
    },
    allMembers: {
      title: 'सभी सदस्य',
      notMember: 'आप इस वर्कस्पेस के सदस्य नहीं हैं।',
      visible: 'आप यह देख सकते हैं क्योंकि आप वर्कस्पेस के सदस्य हैं।',
    },
    matrix: {
      title: 'अनुमति मैट्रिक्स',
      description: 'आपकी वर्तमान भूमिका के विरुद्ध सभी अनुमतियां सत्यापित',
      denied: 'अस्वीकृत',
      grantedStatus: 'स्वीकृत',
    },
  },
  profile: {
    title: 'उपयोगकर्ता प्रोफ़ाइल',
    description: 'उपयोगकर्ता विशेषताएं और फ़ीचर फ़्लैग',
    identity: {
      title: 'पहचान',
      subtitle: 'useSaaSAuth() से',
      name: 'नाम',
      email: 'ईमेल पता',
      role: 'भूमिका',
      id: 'आईडी',
    },
    workspaceFeatures: {
      title: 'वर्कस्पेस फ़ीचर फ़्लैग',
      enabled: 'सक्षम',
      disabled: 'अक्षम',
    },
    attributes: {
      title: 'उपयोगकर्ता विशेषताएं',
      description: 'प्रति उपयोगकर्ता कस्टम की-वैल्यू जोड़े',
      empty: 'अभी कोई विशेषताएं कॉन्फ़िगर नहीं।',
      setTitle: 'विशेषता सेट करें (डेमो)',
      keyPlaceholder: 'कुंजी (जैसे theme)',
      valuePlaceholder: 'मूल्य',
      saving: 'सहेजा जा रहा है…',
      save: 'सहेजें',
      saved: 'सहेजा गया!',
      failed: 'सहेजने में विफल।',
    },
    userFeatures: {
      title: 'उपयोगकर्ता फ़ीचर फ़्लैग',
      description: 'उपयोगकर्ता स्तर के फ़ीचर फ़्लैग',
      empty: 'इस उपयोगकर्ता के लिए कोई फ़्लैग कॉन्फ़िगर नहीं।',
      loading: 'लोड हो रहा है...',
      enabled: 'सक्षम',
      disabled: 'अक्षम',
    },
  },
  usage: {
    title: 'कोटा उपयोग',
    description: 'रियल-टाइम कोटा उपभोग',
    loading: 'कोटा लोड हो रहे हैं...',
    error: 'कोटा डेटा लोड करने में त्रुटि।',
    empty: 'इस वर्कस्पेस के लिए कोई कोटा कॉन्फ़िगर नहीं।',
    quotaCard: {
      remaining: '{count} शेष',
      unlimited: 'असीमित',
      exhausted: 'समाप्त',
      overage: 'अधिकता',
      threshold: '80% से अधिक उपयोग ({pct}%) — सीमा के पास',
      overageMsg: '{count} इकाइयों की अधिकता',
      exhaustedMsg:
        'कोटा समाप्त — इस कोटा का उपयोग करने वाली क्रियाएं अवरुद्ध हैं',
      used: 'उपयोग किया',
      overageAllowed: '(अनुमत)',
    },
    record: {
      title: 'उपयोग रिकॉर्ड करें',
      description: 'मैन्युअल रूप से कोटा उपयोग रिकॉर्ड करें',
      slugPlaceholder: 'कोटा स्लग (जैसे api_calls)',
      qtyPlaceholder: 'मात्रा',
      recording: 'रिकॉर्ड हो रहा है…',
      record: 'रिकॉर्ड करें',
      success: '"{slug}" के लिए {qty} इकाई(यां) रिकॉर्ड की गईं।',
      failed: 'उपयोग रिकॉर्ड करने में विफल।',
    },
    logs: {
      title: 'उपयोग लॉग',
      description: 'हालिया उपयोग प्रविष्टियां',
      loading: 'लॉग लोड हो रहे हैं…',
      empty:
        'अभी कोई उपयोग प्रविष्टि नहीं। प्रविष्टियां देखने के लिए नीचे उपयोग रिकॉर्ड करें।',
      table: {
        quota: 'कोटा',
        quantity: 'मात्रा',
        source: 'स्रोत',
        date: 'दिनांक',
      },
    },
  },
  creditStore: {
    title: 'क्रेडिट पैकेज',
    subtitle:
      'AI जनरेशन, निर्यात और अधिक जैसी प्रीमियम सुविधाओं को अनलॉक करने के लिए क्रेडिट खरीदें।',
    buy: 'क्रेडिट खरीदें',
    validFor: '{days} दिनों के लिए वैध',
    noExpiry: 'कोई समाप्ति नहीं',
    noPackages: 'अभी कोई क्रेडिट पैकेज उपलब्ध नहीं।',
    error: 'क्रेडिट पैकेज लोड करने में त्रुटि',
  },
  pricing: {
    title: 'मूल्य निर्धारण',
    subtitle: 'अपनी जरूरतों के अनुसार प्लान चुनें',
    billing: 'बिलिंग',
    monthly: 'मासिक',
    quarterly: 'त्रैमासिक',
    yearly: 'वार्षिक',
    perMonth: '/माह',
    perQuarter: '/तिमाही',
    perYear: '/वर्ष',
    currency: 'मुद्रा',
    quotas: 'कोटा',
    limits: 'सीमाएं',
    credits: 'AI क्रेडिट',
    creditsPerPeriod: 'क्रेडिट / अवधि',
    features: 'सुविधाएं',
    included: 'शामिल',
    perUnit: 'उसके बाद',
    loading: 'प्लान लोड हो रहे हैं...',
    noPlans: 'कोई प्लान उपलब्ध नहीं',
    error: 'मूल्य निर्धारण लोड करने में त्रुटि',
    meta: {
      title: 'मूल्य निर्धारण',
      description: 'हमारे प्लान और मूल्य निर्धारण देखें',
    },
  },
  credits: {
    title: 'क्रेडिट',
    description:
      'प्रीमियम क्रियाओं के लिए क्रेडिट का उपयोग करें। वर्कस्पेस सेटिंग्स में पैकेज प्रबंधित करें।',
    balance: 'क्रेडिट बैलेंस',
    creditsAvailable: 'क्रेडिट उपलब्ध',
    manageCredits: 'क्रेडिट प्रबंधित करें',
    buyCredits: 'क्रेडिट खरीदें',
    choosePlan: 'प्लान चुनें',
    noCredits:
      'आपके पास कोई क्रेडिट नहीं बचा। प्रीमियम सुविधाएं जारी रखने के लिए और खरीदें।',
    buyMore: 'क्रेडिट खरीदें',
    packages: {
      title: 'क्रेडिट पैकेज',
      loading: 'पैकेज लोड हो रहे हैं…',
      error: 'पैकेज लोड करने में त्रुटि।',
      empty: 'अभी कोई क्रेडिट पैकेज कॉन्फ़िगर नहीं।',
      credits: 'क्रेडिट',
      validFor: '{days} दिनों के लिए वैध',
      buyNow: 'अभी खरीदें',
    },
    testConsume: {
      title: 'क्रेडिट उपभोग परीक्षण',
      description:
        'अपने बैलेंस से क्रेडिट उपभोग परीक्षण के लिए इन बटनों का उपयोग करें।',
      use: '{amount} उपयोग करें',
      apiDescription: 'परीक्षण: {amount} क्रेडिट उपभोग करें',
      success: '{amount} क्रेडिट उपभोग किए। बैलेंस: {balance}',
      insufficient:
        'अपर्याप्त क्रेडिट। उपलब्ध: {available}, अनुरोधित: {requested}',
    },
    lowCredits: {
      title: 'कम क्रेडिट',
      description:
        'आपका क्रेडिट बैलेंस कम है। रुकावट से बचने के लिए अभी रिचार्ज करें।',
    },
    expiring: {
      title: 'जल्द समाप्त होने वाले क्रेडिट',
      description: 'अगले 30 दिनों में समाप्त होने वाले क्रेडिट',
      expiresIn: '{date} को समाप्त',
      noExpiring: 'कोई क्रेडिट जल्द समाप्त नहीं होगा',
      days: '{count} क्रेडिट',
      loading: 'लोड हो रहा है...',
    },
    transactions: {
      title: 'लेनदेन इतिहास',
      description: 'हालिया क्रेडिट जोड़ और कटौती',
      empty: 'अभी कोई लेनदेन नहीं',
      loading: 'लोड हो रहा है...',
      columns: {
        type: 'प्रकार',
        amount: 'राशि',
        balance: 'बाद में बैलेंस',
        description: 'विवरण',
      },
      types: {
        credit: 'क्रेडिट',
        debit: 'डेबिट',
      },
    },
  },
  errors: {
    generic: {
      title: 'कुछ गलत हुआ',
      description:
        'एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें या समस्या बनी रहने पर सहायता से संपर्क करें।',
      tryAgain: 'पुनः प्रयास करें',
      goHome: 'होम पर जाएं',
    },
    notFound: {
      title: 'पृष्ठ नहीं मिला',
      description:
        'क्षमा करें, हम वह पृष्ठ नहीं ढूंढ सके जिसे आप ढूंढ रहे हैं। इसे स्थानांतरित या हटाया जा सकता है।',
      goBack: 'वापस जाएं',
    },
    blogNotFound: {
      title: 'पोस्ट नहीं मिली',
      description:
        'जिस ब्लॉग पोस्ट को आप ढूंढ रहे हैं वह मौजूद नहीं है, हटाई जा सकती है, या आपकी भाषा में उपलब्ध नहीं है।',
      browseAll: 'सभी पोस्ट देखें',
    },
  },
  blog: {
    label: 'ब्लॉग',
    heading: 'नवीनतम पोस्ट',
    description: 'हमारी टीम से अपडेट, ट्यूटोरियल और अंतर्दृष्टि।',
    noPosts: 'अभी कोई पोस्ट नहीं। जल्द वापस आएं!',
    noPostsTag: 'इस टैग के साथ अभी कोई पोस्ट नहीं।',
    noPostsCategory: 'इस श्रेणी में अभी कोई पोस्ट नहीं।',
    noPostsAuthor: 'इस लेखक की अभी कोई पोस्ट नहीं।',
    postsByAuthor: '{name} की पोस्ट',
    postsTaggedCount: '"{tag}" टैग वाली {count} पोस्ट',
    postsInCategoryCount: 'इस श्रेणी में {count} पोस्ट',
    readMore: 'और पढ़ें',
    read: 'पढ़ें',
    allPosts: '← सभी पोस्ट',
    previous: 'पिछला',
    next: 'अगला',
    pageOf: 'पृष्ठ {page} / {total}',
    relatedPosts: 'संबंधित पोस्ट',
    share: 'साझा करें',
    rssLabel: 'RSS फ़ीड',
    shareAriaX: 'X / Twitter पर शेयर करें',
    shareAriaLinkedin: 'LinkedIn पर शेयर करें',
    shareAriaFacebook: 'Facebook पर शेयर करें',
    shareAriaCopy: 'लिंक कॉपी करें',
    shareAriaCopied: 'लिंक कॉपी हो गया!',
    search: {
      trigger: 'पोस्ट खोजें...',
      placeholder: 'ब्लॉग पोस्ट खोजें...',
      searching: 'खोज रहा है...',
      noResults: '"{query}" के लिए कोई परिणाम नहीं',
      startTyping: 'खोजने के लिए टाइप करना शुरू करें...',
    },
    meta: {
      title: 'ब्लॉग',
      titlePage: 'ब्लॉग — पृष्ठ {page}',
      description: 'हमारी टीम से नवीनतम पोस्ट, ट्यूटोरियल और अपडेट।',
      tagTitle: '"{tag}" टैग वाली पोस्ट',
      tagDescription: '"{tag}" टैग वाली सभी ब्लॉग पोस्ट।',
      categoryTitle: '{category} — ब्लॉग',
      categoryDescription: '"{category}" श्रेणी की ब्लॉग पोस्ट।',
    },
  },
  changelog: {
    label: 'परिवर्तन लॉग',
    heading: 'नया क्या है',
    description: 'सभी नवीनतम अपडेट, सुधार और फ़िक्स।',
    rssLabel: 'RSS फ़ीड',
    permalink: 'स्थायी लिंक',
    meta: {
      title: 'परिवर्तन लॉग',
      description: 'सभी नवीनतम अपडेट, सुधार और फ़िक्स।',
    },
  },
  cookieConsent: {
    title: 'हम कुकीज़ का उपयोग करते हैं',
    descriptionBefore:
      'हम अपना अनुभव बेहतर करने, ट्रैफ़िक विश्लेषण करने और सामग्री को व्यक्तिगत बनाने के लिए कुकीज़ का उपयोग करते हैं। आप चुन सकते हैं कि कौन सी कुकीज़ की अनुमति दें। पढ़ें हमारी',
    policyLinkPrivacy: 'गोपनीयता नीति',
    policyLinkCookie: 'कुकी नीति',
    dismissAriaLabel: 'अभी बंद करें',
    necessary: {
      title: 'आवश्यक',
      description: 'साइट के कार्य के लिए आवश्यक। अक्षम नहीं किया जा सकता।',
    },
    analytics: {
      title: 'विश्लेषण',
      description:
        'हमें यह समझने में मदद करता है कि आगंतुक हमारी साइट का उपयोग कैसे करते हैं।',
    },
    marketing: {
      title: 'मार्केटिंग',
      description:
        'प्रासंगिक विज्ञापन दिखाने और अभियान ट्रैक करने के लिए उपयोग किया जाता है।',
    },
    acceptAll: 'सभी स्वीकार करें',
    rejectAll: 'सभी अस्वीकार करें',
    savePreferences: 'प्राथमिकताएं सहेजें',
    customize: 'अनुकूलित करें',
  },
};

export default messages;
