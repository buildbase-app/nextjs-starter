import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      documents: 'दस्तावेज़',
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
      tour: 'टूर',
      inbox: 'इनबॉक्स',
      modules: 'मॉड्यूल',
      sections: {
        start: 'शुरुआत',
        product: 'प्रोडक्ट',
        billing: 'बिलिंग',
        platform: 'प्लेटफ़ॉर्म',
      },
      forms: 'फ़ॉर्म',
      collections: 'कलेक्शन',
      assets: 'एसेट',
      links: 'शॉर्ट लिंक',
      audience: 'ऑडियंस',
      tracking: 'ट्रैकिंग',
      automations: 'ऑटोमेशन',
      reports: 'रिपोर्ट',
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
        tour: 'टूर',
        github: 'GitHub पर सोर्स',
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
    title: 'BuildBase Demo',
    hero: {
      badge: 'लाइव डेमो · {count} कार्य',
      heading:
        'BuildBase की हर क्षमता, <highlight>एक बार में एक कार्य</highlight>',
      description:
        'BuildBase SDK पर बना असली ऐप, गाइडेड टूर के साथ: साइन इन करें और साइन-अप, वर्कस्पेस, बिलिंग, उपयोग, क्रेडिट, सूचनाएँ, एजेंट और वेबहुक आज़माएँ, हर एक बताता है कि वह कहाँ से आता है।',
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
      tasks: {
        label: 'टूर के कार्य',
        sublabel: 'हर एक आज़माने योग्य क्षमता',
      },
      groups: {
        label: 'समूह',
        sublabel: 'साइन-इन से वेबहुक तक',
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
        owner: 'स्वामी',
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
      changeRole: 'भूमिका बदलें',
    },
    invite: {
      title: 'ईमेल से आमंत्रित करें',
      description:
        'पते का खाता होना ज़रूरी नहीं। उन्हें ईमेल मिलता है, लिंक खोलते हैं, साइन अप या इन करते हैं और स्वीकार करते हैं।',
      noPermission: 'आपकी भूमिका सदस्यों को आमंत्रित नहीं कर सकती।',
      emailPlaceholder: 'name@company.com',
      role: 'भूमिका',
      send: 'आमंत्रण भेजें',
      sent: '{email} को आमंत्रण भेजा गया',
      failed: 'कुछ गलत हो गया',
      resent: 'आमंत्रण फिर भेजा गया',
      revoked: 'आमंत्रण रद्द किया गया',
      seatNote: '{count} लंबित आमंत्रण जवाब मिलने तक सीट रोके रखते हैं।',
      pendingTitle: 'लंबित',
      loading: 'लोड हो रहा है…',
      none: 'कुछ लंबित नहीं।',
      invitedBy: '{name} द्वारा आमंत्रित',
      pendingLabel: 'लंबित',
      expires: '{date} को समाप्त',
      cooldown: '{seconds} सेकंड में फिर भेज सकेंगे',
      resend: 'फिर भेजें',
      revoke: 'रद्द करें',
    },
    roleChanged: 'भूमिका बदलकर {role} की गई',
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
    featureGates: {
      title: 'फ़ीचर गेट',
      description:
        'इस उत्पाद के वे हिस्से जो वर्कस्पेस या यूज़र फ़ीचर फ़्लैग से चालू होते हैं।',
    },
    workbench: {
      title: 'आपके दस्तावेज़',
      description:
        'दस्तावेज़ इस ऐप के अपने डेटाबेस में रहते हैं; प्लेटफ़ॉर्म उन्हें मापता है।',
      search: 'दस्तावेज़ खोजें',
      allStatuses: 'सभी स्थितियाँ',
      allTags: 'सभी टैग',
      newDocument: 'नया दस्तावेज़',
      newDocumentHint:
        'बनाने पर documents कोटा में उपयोग दर्ज होता है और एक क्रेडिट खर्च होता है।',
      titleLabel: 'शीर्षक',
      contentLabel: 'सामग्री (Markdown)',
      statusLabel: 'स्थिति',
      tagsLabel: 'टैग, अल्पविराम से अलग',
      create: 'बनाएँ',
      creating: 'बना रहे हैं…',
      created: 'दस्तावेज़ बन गया',
      deleted: 'दस्तावेज़ हटाया गया',
      delete: 'हटाएँ',
      loadSamples: 'नमूना दस्तावेज़ लोड करें',
      clearSamples: 'नमूने हटाएँ',
      samplesLoaded: '{count} नमूना दस्तावेज़ लोड हुए',
      samplesAlready: 'नमूने पहले से लोड हैं',
      samplesCleared: '{count} नमूना दस्तावेज़ हटाए गए',
      sample: 'नमूना',
      empty: 'अभी कोई दस्तावेज़ नहीं।',
      total: 'कुल {count}',
      words: '{count} शब्द',
      loadFailed: 'दस्तावेज़ लोड नहीं हो सके',
      viewerNotice:
        'यहाँ आपकी भूमिका {role} है: आप पढ़ सकते हैं, लिख नहीं सकते। बटन अक्षम हैं और सर्वर वैसे भी मना करता है।',
      quotaExhausted:
        'इस प्लान का documents कोटा समाप्त है और ओवरेज नहीं है। और बनाने के लिए अपग्रेड करें।',
      quotaExhaustedShort: 'कोटा समाप्त',
      quotaWarning:
        'आपने इस प्लान के documents कोटा का 80% से अधिक उपयोग कर लिया है।',
      creditsLow: 'क्रेडिट कम हो रहे हैं। हर दस्तावेज़ एक खर्च करता है।',
      creditsExhausted:
        'कोई क्रेडिट नहीं बचा। दस्तावेज़ फिर भी बनते हैं; मीटरिंग पंक्ति दिखाती है कि खर्च छोड़ा गया।',
      refusedQuota:
        'अस्वीकृत: {included} में से {consumed} दस्तावेज़ उपयोग हुए और प्लान की सख्त सीमा है।',
      refusedRole: 'अस्वीकृत: {role} भूमिका लिख नहीं सकती।',
      meteringTitle: 'प्लेटफ़ॉर्म ने क्या दर्ज किया',
      meteringUsage: 'उपयोग: {included} में से {used} दस्तावेज़',
      meteringUsageSkipped:
        'उपयोग: दर्ज नहीं (इस प्लान में documents कोटा नहीं)',
      meteringCredits: 'क्रेडिट: {amount} खर्च, {balance} शेष',
      meteringCreditsSkipped: 'क्रेडिट: खर्च नहीं (शेष नहीं)',
      statuses: {
        draft: 'मसौदा',
        in_review: 'समीक्षा में',
        published: 'प्रकाशित',
        archived: 'संग्रहीत',
      },
    },
    title: 'दस्तावेज़',
    description:
      'आपके वर्कस्पेस के दस्तावेज़: यहाँ या किसी एजेंट द्वारा बनाए गए, प्लेटफ़ॉर्म द्वारा मापे गए।',
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
    webhooks: {
      title: 'प्राप्त वेबहुक',
      description:
        'प्लेटफ़ॉर्म से हस्ताक्षरित सर्वर-से-सर्वर डिलीवरी, इस वर्कस्पेस के लिए /api/webhooks/buildbase द्वारा संग्रहीत।',
      empty:
        'अभी कोई वेबहुक नहीं। सदस्यता लें, किसी को आमंत्रित करें या क्रेडिट खरीदें और प्लेटफ़ॉर्म इस ऐप को कॉल करेगा।',
      refresh: 'रीफ़्रेश',
      event: 'इवेंट',
      received: 'प्राप्त',
      signature: 'हस्ताक्षर',
      verified: 'सत्यापित',
      payload: 'पेलोड',
      when: 'प्लेटफ़ॉर्म समय',
    },
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
    title: 'सूचनाएँ',
    description: 'इस ऐप से एक सूचना भेजें और देखें कि वह कहाँ पहुँचती है',
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
        'डेमो इवेंट "{slug}" है, जो कंसोल में ईमेल और पुश के साथ पंजीकृत है। सिर्फ़ पुश के लिए कोई भी स्लग चलेगा; ईमेल के लिए पंजीकृत इवेंट चाहिए।',
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
      description: 'प्लेटफ़ॉर्म ने इस भेजने के साथ क्या किया।',
      openInbox: 'इनबॉक्स खोलें',
    },
    toast: {
      workspaceRequired: 'पहले एक वर्कस्पेस चुनें',
      sent: '{count} उपयोगकर्ता(ओं) को सूचना भेजी गई',
      notSent: 'सूचना नहीं भेजी गई: {reason}',
      inboxHint: 'घंटी और अपना इनबॉक्स देखें।',
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
    agents: {
      title: 'जुड़े हुए एजेंट',
      description:
        'वे AI क्लाइंट जिन्हें आपने MCP पर अपनी ओर से काम करने की अनुमति दी है। डिस्कनेक्ट करने पर उनकी पहुँच रद्द हो जाती है।',
      guideTitle: 'एजेंट जोड़ें',
      guideDescription:
        'यह ऐप एक MCP सर्वर है। इसे Claude, Cursor या ChatGPT में जोड़ें और अपने BuildBase खाते से साइन इन करें; फिर एजेंट आपकी अनुमतियों के साथ आपके वर्कस्पेस और इस ऐप के दस्तावेज़ पढ़ता है।',
    },
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
    loads: 'लोड होता है: {names}',
    customize: 'अनुकूलित करें',
  },
  inbox: {
    title: 'इनबॉक्स',
    description:
      'इस ऐप ने आपको जो कुछ भेजा है, हर सूचना के लिए एक आइटम, चाहे वह कैसे भी पहुँची हो।',
    rules: {
      live: 'नए आइटम सॉकेट पर लाइव आते हैं; रीलोड की ज़रूरत नहीं।',
      read: 'आइटम तब पढ़ा माना जाता है जब आप उसे यहाँ खोलें या उसका लिंक क्लिक करें। सिर्फ़ ईमेल खोलने से नहीं।',
      email:
        'हर आइटम दिखाता है कि ईमेल और पुश ने क्या किया, ताकि पता चले कोई चैनल चुप क्यों रहा।',
    },
  },
  tour: {
    title: 'टूर',
    subtitle:
      'आज़माने के लिए {total} चीज़ें, हर एक BuildBase की क्षमता और वह कहाँ से आती है।',
    progress: '{total} में से {done} पूरे',
    markDone: 'पूरा करें',
    undo: 'पूर्ववत',
    open: 'खोलें',
    detected: 'अपने आप पहचाना जाता है',
    manual: 'स्वयं पुष्टि करें',
    why: 'यह क्यों मायने रखता है',
    steps: 'क्या करना है',
    fromSdk: 'SDK से',
    fromConsole: 'कंसोल में कॉन्फ़िगर',
    fromApp: 'इस ऐप में',
    requires: 'पहले करें',
    allDone: 'आपने सब कुछ कर लिया। इसे घर ले जाएँ।',
    homeTitle: 'सब कुछ आज़माएँ, एक बार में एक काम',
    homeSubtitle:
      'साइन इन करें और {groups} समूहों में {total} कार्य पूरे करें। हर एक BuildBase की क्षमता, ऐप में उसका रूप और उसकी कॉन्फ़िगरेशन दिखाता है।',
    homeCta: 'टूर शुरू करें',
    dashboardCard: 'आपका टूर',
    next: 'अगला',
    cloneTitle: 'इस ऐप को क्लोन करें',
    cloneBody:
      'यहाँ का हर पेज और हर कार्य एक खुली रिपॉज़िटरी में है। देखें कि कोई भी हिस्सा कैसे काम करता है, या इसे क्लोन करके अपना ऐप शुरू करें।',
    browseCode: 'कोड देखें',
    copy: 'कॉपी करें',
    copied: 'कॉपी हो गया',
    dashboardCta: 'जारी रखें',
  },
  help: {
    title: 'सहायता केंद्र',
    description:
      'इस पृष्ठ की हर चीज़ कंसोल में लिखी गई है: नीति, दस्तावेज़, सामान्य प्रश्न और प्रशंसापत्र। वहाँ बदलें, यहाँ रीलोड करें।',
    notConfigured: {
      title: 'अभी कोई सामग्री नहीं',
      token:
        'इस ऐप के पास संगठन API टोकन नहीं है, इसलिए यह कंसोल सामग्री नहीं पढ़ सकता। BUILDBASE_API_TOKEN सेट करें।',
      empty: 'संगठन में अभी डेमो सामग्री नहीं है। इससे सीड करें:',
    },
    from: {
      richContent: 'रिच कंटेंट',
      docs: 'डॉक्स',
      faqs: 'FAQ संग्रह',
      testimonials: 'प्रशंसापत्र',
    },
    docs: {
      title: 'दस्तावेज़',
      empty: 'अभी कोई प्रकाशित दस्तावेज़ नहीं।',
    },
    faq: {
      title: 'अक्सर पूछे जाने वाले प्रश्न',
    },
    testimonials: {
      title: 'ग्राहक क्या कहते हैं',
    },
  },
  forms: {
    title: 'फ़ॉर्म',
    description:
      'कंसोल में बना फ़ॉर्म, उसके लाइव स्कीमा से रेंडर और इस ऐप से सबमिट।',
    loading: 'फ़ॉर्म लोड हो रहा है…',
    fromConsole: 'फ़ील्ड कंसोल से आते हैं; वहाँ एक जोड़ें और रीलोड करें।',
    submit: 'भेजें',
    sending: 'भेजा जा रहा है…',
    sent: 'भेजा गया',
    hint: 'सबमिशन कलेक्शन रिकॉर्ड के रूप में सहेजे जाते हैं और form.submitted इवेंट चलाते हैं।',
    errors: {
      title: 'प्लेटफ़ॉर्म ने यह सबमिशन अस्वीकार किया',
      generic: 'कुछ स्वीकार नहीं हुआ।',
    },
    missing: {
      title: 'अभी कोई संपर्क फ़ॉर्म नहीं',
      token:
        'इस ऐप के पास संगठन API टोकन नहीं है। BUILDBASE_API_TOKEN सेट करें।',
      form: 'संगठन में Contact नाम का फ़ॉर्म नहीं है। इससे सीड करें:',
    },
    toast: {
      sent: 'सबमिट हुआ। अब यह प्लेटफ़ॉर्म पर एक रिकॉर्ड है।',
    },
    submissions: {
      title: 'नवीनतम सबमिशन',
      description: 'फ़ॉर्म के कलेक्शन से पढ़े गए।',
      refresh: 'रीफ़्रेश',
      empty: 'अभी कुछ सबमिट नहीं हुआ।',
    },
  },
  collections: {
    title: 'कलेक्शन',
    description:
      'प्लेटफ़ॉर्म पर कस्टम डेटा: वर्ज़न वाला स्कीमा, लाइव वर्ज़न के रिकॉर्ड।',
    loading: 'रिकॉर्ड लोड हो रहे हैं…',
    liveVersion: 'लाइव वर्ज़न {version} ({name}), {fields} फ़ील्ड',
    noLiveVersion: 'कोई लाइव वर्ज़न नहीं। कंसोल में एक प्रकाशित करें।',
    refresh: 'रीफ़्रेश',
    empty: 'कोई रिकॉर्ड नहीं। सीड करें या कंसोल में जोड़ें।',
    actions: 'क्रियाएँ',
    delete: 'रिकॉर्ड हटाएँ',
    hint: 'कंसोल में एक अतिरिक्त फ़ील्ड के साथ नया वर्ज़न प्रकाशित करें; रीलोड पर कॉलम यहाँ दिखेगा।',
    missing: {
      title: 'अभी release-notes कलेक्शन नहीं',
      token:
        'इस ऐप के पास संगठन API टोकन नहीं है। BUILDBASE_API_TOKEN सेट करें।',
      collection:
        'संगठन में release-notes स्लग वाला कलेक्शन नहीं है। इससे सीड करें:',
    },
    toast: {
      deleted: 'प्लेटफ़ॉर्म पर रिकॉर्ड हटाया गया।',
      deleteFailed: 'रिकॉर्ड नहीं हटाया जा सका।',
    },
  },
  tracking: {
    title: 'ट्रैकिंग',
    description:
      'कंसोल से एनालिटिक्स और विज्ञापन टैग, सहमति के बाद लोड, आपके अपने इवेंट और एट्रिब्यूशन के साथ।',
    loading: 'लोड हो रहा है…',
    consent: {
      title: 'सहमति',
      description: 'इस ऐप से जुड़े टैग से बनी, पूरी लाइब्रेरी से नहीं।',
      noTags:
        'इस ऐप से अभी कोई टैग नहीं जुड़ा। कंसोल में सेटिंग्स → ट्रैकिंग में एक जोड़ें और क्लाइंट से जोड़ें।',
      privacy: 'गोपनीयता',
      analytics: 'एनालिटिक्स',
      marketing: 'मार्केटिंग',
      change: 'कुकी विकल्प बदलें',
      state: 'वर्तमान स्थिति',
      unset: 'अभी पूछा नहीं गया',
    },
    installed: {
      title: 'इंस्टॉल प्रोवाइडर',
      description: 'सहमति के बाद इस ब्राउज़र में वास्तव में क्या लोड हुआ।',
      none: 'कुछ लोड नहीं हुआ। सहमति दें, या कंसोल में टैग जोड़ें।',
    },
    custom: {
      title: 'कस्टम इवेंट ट्रैक करें',
      description: 'आपके अपने इवेंट डेटा लेयर और हर इंस्टॉल वेंडर तक जाते हैं।',
      button: 'report_exported ट्रैक करें',
      fired: '{count} बार भेजा गया',
    },
    attribution: {
      title: 'एट्रिब्यूशन',
      description:
        'यह विज़िटर कहाँ से आया: क्लिक आईडी और कैंपेन पैरामीटर, पहले पेज पर कैप्चर।',
      empty: 'कुछ कैप्चर नहीं हुआ। इसके साथ रीलोड करें',
    },
    log: {
      title: 'लाइव इवेंट लॉग',
      description:
        'इस टैब में SDK द्वारा भेजा गया हर इवेंट, अपने आप भेजे गए भी।',
      empty: 'अभी कोई इवेंट नहीं। पेज बदलें, या ऊपर एक ट्रैक करें।',
    },
  },
  automations: {
    title: 'ऑटोमेशन',
    description:
      'वर्कफ़्लो कंसोल में बनते हैं; यह ऐप उनके इवेंट पैदा करता है और आपके लिए क्या चला, पढ़ता है।',
    refresh: 'रीफ़्रेश',
    loading: 'लोड हो रहा है…',
    notConfigured:
      'BUILDBASE_API_TOKEN सेट नहीं है, इसलिए यह ऐप वर्कफ़्लो रन नहीं पढ़ सकता।',
    error: 'रन लोड नहीं हो सके',
    runs: {
      title: 'आपके रन',
      description:
        'प्लेटफ़ॉर्म ने आपके खाते के लिए जो वर्कफ़्लो इंस्टेंस शुरू किए।',
      empty:
        'अभी कोई रन नहीं। संपर्क फ़ॉर्म सबमिट करें या नया उपयोगकर्ता साइन अप करें, फिर रीफ़्रेश करें।',
      workflow: 'वर्कफ़्लो',
      event: 'इवेंट',
      status: 'स्थिति',
      nodes: 'पूरे नोड',
      started: 'शुरू',
    },
    calls: {
      title: 'इस ऐप में कॉल',
      description:
        'वर्कफ़्लो के HTTP Webhook एक्शन ने /api/buildbase/provision पर क्या भेजा, साझा सीक्रेट से सत्यापित।',
      empty: 'अभी कोई प्रोविज़निंग कॉल नहीं मिली।',
    },
  },
  reports: {
    title: 'रिपोर्ट',
    description:
      'हर मॉड्यूल एक ही चार्ट और काउंट एंडपॉइंट से रिपोर्ट करता है; पिछले तीस दिनों के तीन।',
    notConfigured:
      'BUILDBASE_API_TOKEN सेट नहीं है, इसलिए यह ऐप रिपोर्ट नहीं पढ़ सकता।',
    loading: 'लोड हो रहा है…',
    refresh: 'रीफ़्रेश',
    window: '{from} से {to}',
    counts: {
      current: 'उपयोगकर्ता, पिछले 30 दिन',
      previous: 'उपयोगकर्ता, उससे पहले के 30 दिन',
    },
    unavailable: 'उपलब्ध नहीं',
    series: {
      users: {
        title: 'साइन-अप',
        description: 'प्रति दिन नए उपयोगकर्ता।',
      },
      forms: {
        title: 'फ़ॉर्म सबमिशन',
        description: 'प्रति दिन संपर्क फ़ॉर्म सबमिशन।',
      },
      links: {
        title: 'लिंक क्लिक',
        description: 'प्रति दिन शॉर्ट लिंक क्लिक।',
      },
    },
  },
  assets: {
    title: 'एसेट',
    description:
      'इस ऐप से अपलोड की गई फ़ाइलें, प्लेटफ़ॉर्म द्वारा संग्रहित और परोसी गई।',
    upload: 'फ़ाइल अपलोड करें',
    uploading: 'अपलोड हो रहा है…',
    limit: '5 MB तक। छवियाँ पूर्वावलोकन दिखाती हैं।',
    uploaded: 'अपलोड हो गया',
    gallery: 'फ़ाइलें',
    empty: 'अभी कोई फ़ाइल नहीं। ऊपर एक अपलोड करें।',
    public: 'सार्वजनिक',
    private: 'निजी',
    makePrivate: 'निजी करें',
    makePublic: 'सार्वजनिक करें',
    nowPublic: 'अब सार्वजनिक: URL फिर काम करता है।',
    nowPrivate: 'अब निजी: सार्वजनिक URL काम करना बंद कर देता है।',
    openUrl: 'खोलें',
    tooLarge: 'यह फ़ाइल 5 MB से बड़ी है।',
    loadFailed: 'प्लेटफ़ॉर्म से संपर्क नहीं हो सका।',
    notConfigured:
      'यह पेज API टोकन के ज़रिए संगठन पढ़ता है। BUILDBASE_API_TOKEN सेट करें (कंसोल → Settings → Tokens) और पुनः आरंभ करें।',
  },
  links: {
    title: 'शॉर्ट लिंक',
    description:
      'शेयर लिंक जिन्हें प्लेटफ़ॉर्म रीडायरेक्ट और गिनता है, एक क्लिक एक बार में।',
    create: 'शॉर्ट लिंक बनाएँ',
    createHint:
      'कोई भी URL। प्लेटफ़ॉर्म 12-अक्षर की id देता है और हर क्लिक को देश और डिवाइस के साथ दर्ज करता है।',
    name: 'नाम',
    url: 'गंतव्य URL',
    createButton: 'बनाएँ',
    created: 'लिंक बन गया',
    yourLinks: 'आपके लिंक',
    clicksHint:
      'लिंक खोलें, फिर रीफ़्रेश करें: गिनती प्लेटफ़ॉर्म से आती है, इस पेज से नहीं।',
    refresh: 'रीफ़्रेश',
    empty: 'अभी कोई लिंक नहीं।',
    clicks: 'क्लिक',
    copy: 'शॉर्ट URL कॉपी करें',
    copied: 'कॉपी हो गया',
    follow: 'खोलें',
    changeDestination: 'गंतव्य बदलें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    updated: 'गंतव्य बदला। शॉर्ट URL वही है।',
    chart: 'क्लिक, पिछले 14 दिन',
    chartHint: 'सभी लिंक मिलाकर, प्रति दिन।',
    chartEmpty: 'अभी कोई क्लिक नहीं।',
    loadFailed: 'प्लेटफ़ॉर्म से संपर्क नहीं हो सका।',
    notConfigured:
      'यह पेज API टोकन के ज़रिए संगठन पढ़ता है। BUILDBASE_API_TOKEN सेट करें (कंसोल → Settings → Tokens) और पुनः आरंभ करें।',
  },
  audience: {
    title: 'ऑडियंस और विशेषताएँ',
    description:
      'खाते के अलावा प्लेटफ़ॉर्म किसी व्यक्ति के बारे में क्या रखता है: कस्टम विशेषताएँ, मार्केटिंग संपर्क और प्रतीक्षा सूची।',
    failed: 'सहेज नहीं सका।',
    notConfigured: 'न्यूज़लेटर के लिए सर्वर पर BUILDBASE_API_TOKEN चाहिए।',
    onboarding: {
      title: 'ऑनबोर्डिंग चेकलिस्ट',
      description:
        'तीनों टिक करें और सहेजें: SDK आपके ब्राउज़र में, आपके रूप में, onboarded=true और आपका पद उपयोगकर्ता विशेषताओं के रूप में लिखता है।',
      items: {
        profile: 'मैंने अपनी प्रोफ़ाइल भरी',
        workspace: 'मैंने वर्कस्पेस बनाया',
        invite: 'मैंने किसी को आमंत्रित किया',
      },
      role: 'आपका पद (वैकल्पिक)',
      save: 'ऑनबोर्डिंग पूरी करें',
      saved: 'सहेजा गया। कंसोल में अपना रिकॉर्ड खोलकर देखें।',
      already: 'विशेषताओं के अनुसार आप पहले से ऑनबोर्ड हैं।',
    },
    attributes: {
      title: 'आपकी विशेषताएँ',
      description:
        'कुंजियाँ कंसोल में परिभाषित होती हैं (Users → Attributes); मान आपके उपयोगकर्ता पर रहते हैं।',
      empty: 'अभी कोई विशेषता नहीं।',
    },
    locale: {
      title: 'देश, समय क्षेत्र, मुद्रा',
      description:
        'सूचियाँ SDK के साथ आती हैं (@buildbase/sdk/data), कोई डाउनलोड नहीं।',
      country: 'देश',
      timezone: 'समय क्षेत्र',
      currency: 'मुद्रा',
      save: 'प्राथमिकताएँ सहेजें',
      saved: 'प्राथमिकताएँ विशेषताओं के रूप में सहेजी गईं।',
    },
    newsletter: {
      title: 'न्यूज़लेटर',
      description:
        'मार्केटिंग संपर्क आपके खाते से अलग है: यह खाते के बिना भी हो सकता है। सर्वर इसे org टोकन से बनाता है और न्यूज़लेटर सूची में जोड़ता है।',
      email: 'ईमेल',
      subscribe: 'सदस्यता लें',
      subscribed: 'सदस्यता ली गई',
      listed: '{list} सूची में जोड़ा गया।',
      noList: 'संपर्क बना; इस संगठन में अभी कोई न्यूज़लेटर सूची नहीं है।',
      waitlistHint:
        'साइन-आउट आगंतुक बीटा प्रतीक्षा सूची में यहाँ शामिल हो सकते हैं:',
    },
  },
  waitlist: {
    title: 'प्रतीक्षा सूची में शामिल हों',
    description:
      'प्लेटफ़ॉर्म का बीटा फ़ॉर्म: नाम और ईमेल दें, एडमिन कंसोल में आपको स्वीकृत करेगा।',
    success: 'आप सूची में हैं। एडमिन कंसोल से आपको स्वीकृत करेगा।',
    note: 'फ़ॉर्म और उसका पाठ संगठन की बीटा कॉन्फ़िगरेशन से आता है (कंसोल → Users → Beta)।',
  },
};

export default messages;
