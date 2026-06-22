import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      documents: 'Dokumente',
      analytics: 'Analysen',
      team: 'Team',
      notifications: 'Benachrichtigungen',
      settings: 'Einstellungen',
      menu: 'Menü',
      selectWorkspace: 'Arbeitsbereich wählen',
      profile: 'Profil',
      manageWorkspace: 'Arbeitsbereich verwalten',
      generalSettings: 'Allgemeine Einstellungen',
      userManagement: 'Benutzerverwaltung',
      billingPayments: 'Abrechnung & Zahlungen',
      credits: 'Credits',
      creditUsage: 'Credit-Nutzung',
      creditsAvailable: 'Verfügbar',
      usage: 'Nutzung',
      permissions: 'Berechtigungen',
      events: 'Ereignisse',
      invoices: 'Rechnungen',
      workspace: 'Arbeitsbereich',
    },
    buttons: {
      signIn: 'Anmelden',
      signOut: 'Abmelden',
      submit: 'Absenden',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      create: 'Erstellen',
      loading: 'Wird geladen...',
    },
    auth: {
      signInPrompt: 'Bitte melden Sie sich an, um fortzufahren',
      signOutConfirm: 'Möchten Sie sich wirklich abmelden?',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten',
      tagline:
        'Eine Live-Demo-App, die das BuildBase SDK in Aktion zeigt. Melde dich an, um Authentifizierung, Workspaces, Credits, Push-Benachrichtigungen und i18n zu erkunden.',
      sections: {
        product: 'Produkt',
        resources: 'Ressourcen',
        legal: 'Rechtliches',
      },
      links: {
        features: 'Funktionen',
        pricing: 'Preise',
        dashboard: 'Dashboard',
        credits: 'Credits',
        blog: 'Blog',
        changelog: 'Änderungsprotokoll',
        about: 'Über uns',
        privacy: 'Datenschutzrichtlinie',
        terms: 'Nutzungsbedingungen',
      },
    },
    language: {
      select: 'Sprache wählen',
      current: 'Aktuelle Sprache',
    },
    accessibility: {
      skipToContent: 'Zum Inhalt springen',
    },
    theme: {
      toggle: 'Design wechseln',
      light: 'Hell',
      dark: 'Dunkel',
      system: 'System',
    },
    pages: {
      lastUpdated: 'Zuletzt aktualisiert:',
    },
    redirecting: 'Weiterleitung...',
  },
  home: {
    title: 'Meine App',
    hero: {
      badge: 'BuildBase SDK · Live-Demo',
      heading:
        'A working demo built with the <highlight>BuildBase SDK</highlight>',
      description:
        'Melde dich an, um Authentifizierung, Multi-Tenant-Arbeitsbereiche, Kreditabrechnung, Push-Benachrichtigungen und i18n in 8 Sprachen zusammen in einer echten App zu sehen — angetrieben vom BuildBase SDK.',
      signInToExplore: 'Anmelden und erkunden',
      openDashboard: 'Dashboard öffnen',
      viewSource: 'Quellcode ansehen',
      builtWith: 'Erstellt mit',
    },
    stats: {
      languages: {
        label: 'Sprachen in dieser Demo',
        sublabel: 'mit dem Header-Schalter wechseln',
      },
      sdkFeatures: {
        label: 'Live SDK-Funktionen',
        sublabel: 'jede hat eine Demo-Seite',
      },
      notifications: {
        label: 'Benachrichtigungskanäle',
        sublabel: 'Browser-Push + E-Mail',
      },
      authCode: {
        label: 'Zeilen Auth-Code',
        sublabel: 'das SDK erledigt alles',
      },
    },
    cta: {
      heading: 'Bereit, alles in Aktion zu sehen?',
      description:
        'Melde dich an, um das vollständige Dashboard zu öffnen — wechsle Arbeitsbereiche, verbrauche Guthaben, sende eine Push-Benachrichtigung und schalte zwischen allen 8 Sprachen.',
      signIn: 'Anmelden und erkunden',
      openDashboard: 'Dashboard öffnen',
      howBuilt: 'Wie es gebaut wurde',
    },
    features: {
      eyebrow: 'Demo erkunden',
      heading: 'Sieh, was in dieser App funktioniert',
      description:
        'Jede Funktion unten ist live — melde dich an und klicke durch, um das BuildBase SDK in Aktion zu sehen.',
      auth: {
        badge: 'Authentifizierung',
        title: 'OAuth-Anmeldung, sofort einsatzbereit',
        description:
          'Der Anmelde-Button oben verwendet das BuildBase SDK — ein Hook, keine Session-Logik zu schreiben. Nach der Anmeldung erhalten Sie automatisch ein JWT, Workspace-Token und eine Rolle.',
        tryLabel: 'Anmelden und ausprobieren',
      },
      workspaces: {
        badge: 'Arbeitsbereiche',
        title: 'Multi-Tenant-Workspace-Umschalter',
        description:
          'Jeder Benutzer kann mehreren Arbeitsbereichen mit unterschiedlichen Rollen angehören. Die Dashboard-Seitenleiste zeigt Ihren aktuellen Arbeitsbereich und ermöglicht das Wechseln.',
        tryLabel: 'Dashboard öffnen',
      },
      credits: {
        badge: 'Credits',
        title: 'Live-Credit-Guthaben und -Verbrauch',
        description:
          'Die Credits-Seite zeigt Ihr Live-Guthaben, ermöglicht den Kauf über ein integriertes Modal und verfügt über Test-Buttons, die consumeCredits() des SDK in Echtzeit aufrufen.',
        tryLabel: 'Credit-Verbrauch testen',
      },
      notifications: {
        badge: 'Benachrichtigungen',
        title: 'Browser-Push und E-Mail-Zustellung',
        description:
          'Die Benachrichtigungsseite ermöglicht das Abonnieren von Browser-Push, das Verfassen einer Benachrichtigung mit Titel, Dringlichkeit, Aktionsschaltflächen und geplanter Zustellung — dann live senden.',
        tryLabel: 'Testbenachrichtigung senden',
      },
      i18n: {
        badge: 'i18n',
        title: '8 Sprachen einschließlich Arabisch RTL',
        description:
          'Verwenden Sie den Sprachumschalter in der Kopfzeile, um zwischen Englisch, Hindi, Spanisch, Französisch, Deutsch, Japanisch, Chinesisch und Arabisch zu wechseln — das Layout wechselt automatisch zu RTL.',
        tryLabel: 'Zu Arabisch wechseln',
      },
      content: {
        badge: 'Inhalt',
        title: 'MDX-Blog und Änderungsprotokoll, integriert',
        description:
          'Blog und Änderungsprotokoll sind MDX-Dateien, die zur Build-Zeit via Contentlayer2 kompiliert werden. Kein CMS, keine Datenbank — nur Dateien mit typsicherem Frontmatter, Volltextsuche und RSS.',
        tryLabel: 'Blog lesen',
      },
      quotas: {
        badge: 'Kontingente',
        title: 'Kontingentnutzung mit Überschreitungs-Gates',
        description:
          'Die Nutzungsseite ruft useAllQuotaUsage() auf, um Fortschrittsbalken pro Kontingent anzuzeigen. WhenQuotaExhausted blockiert die UI, wenn ein Kontingent null erreicht; WhenQuotaOverage zeigt Überschreitungsdetails.',
        tryLabel: 'Kontingentnutzung anzeigen',
      },
      permissions: {
        badge: 'Berechtigungen',
        title: 'Rollenbasierte Berechtigungsmatrix',
        description:
          'Die Berechtigungsseite verwendet usePermissions() und WhenPermission, um jede Plattformberechtigung in Echtzeit als gewährt oder verweigert basierend auf Ihrer aktuellen Workspace-Rolle anzuzeigen.',
        tryLabel: 'Berechtigungen prüfen',
      },
      events: {
        badge: 'Ereignisse',
        title: 'Live-SDK-Ereignisstrom',
        description:
          'Die Ereignisseite verbindet eventEmitter.setCallbacks(), um alle SDK-Ereignisse zu erfassen — Workspace-Änderungen, Benutzeraktualisierungen, Rollenänderungen — in einem live scrollenden Protokoll.',
        tryLabel: 'Ereignisprotokoll öffnen',
      },
      userData: {
        badge: 'Benutzerdaten',
        title: 'Benutzerattribute und Feature-Flags',
        description:
          'Die Profilseite liest useUserAttributes() und useUserFeatures(), um benutzerdefinierte Schlüssel-Wert-Paare und benutzerspezifische Feature-Flag-Zustände anzuzeigen und neue Attribute live zu schreiben.',
        tryLabel: 'Ihr Profil anzeigen',
      },
      invoices: {
        badge: 'Rechnungen',
        title: 'Rechnungsverlauf und Abrechnungsportal',
        description:
          'Die Rechnungsseite ruft useInvoices() auf, um alle Stripe-Rechnungen mit Status, Betrag und PDF-Links aufzulisten. Ein Button öffnet das Stripe-Kundenportal via useBillingPortal().',
        tryLabel: 'Rechnungen anzeigen',
      },
      seats: {
        badge: 'Sitze',
        title: 'Sitzlimits und Einladungs-Gates',
        description:
          'Das Dashboard ruft useSeatStatus() auf, um die Mitgliederzahl vs. Planlimits in Echtzeit anzuzeigen. WhenNoSubscription, WhenSubscription und WhenSubscriptionToPlans steuern die UI für die richtige Zielgruppe.',
        tryLabel: 'Dashboard öffnen',
      },
      featureFlags: {
        badge: 'Feature-Flags',
        title: 'Feature-Gates auf Workspace-Ebene',
        description:
          'Die Profilseite verwendet WhenWorkspaceFeatureEnabled und WhenWorkspaceFeatureDisabled, um Inhalte basierend auf workspace-level Feature-Flags, die im BuildBase-Dashboard konfiguriert sind, umzuschalten.',
        tryLabel: 'Feature-Gates anzeigen',
      },
    },
    meta: {
      title: 'Meine App',
      description: 'Meine Next.js-App mit shadcn/ui und Theme-Unterstützung',
      tagline: 'Baue etwas Großartiges',
    },
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Willkommen zurück, {name}!',
    trial: {
      endingSoon: 'Testphase endet bald',
      endingSoonMsg:
        'Ihre Testphase endet in {days} Tag{s}. Führen Sie jetzt ein Upgrade durch, um den Zugang zu behalten.',
      upgrade: 'Upgrade',
      freeTrial: 'Sie befinden sich in der Testphase',
      daysRemaining: '{days} Tage verbleibend',
      endsOn: 'Testphase endet am {date}',
      active: 'Testphase aktiv',
      viewPlans: 'Pläne ansehen',
      trialBadge: 'Test',
    },
    noSubscription: {
      title: 'Kein aktives Abonnement',
      hint: 'Abonnieren Sie, um kostenpflichtige Funktionen freizuschalten',
      choosePlan: 'Plan wählen',
    },
    subscription: {
      title: 'Abonnement',
      description: 'Ihr aktueller Plan',
      loading: 'Wird geladen...',
      status: 'Status: {status}',
      activeSubscription: 'Aktives Abonnement',
      changePlan: 'Plan wechseln',
      noPlan: 'Kein aktiver Plan',
      choosePlan: 'Plan wählen',
    },
    subscriptionGates: {
      whenSubscription: {
        title: 'Abonnement-Gate',
        description: 'Nur mit aktivem Abonnement sichtbar',
        fallback:
          'Kein aktives Abonnement — führen Sie ein Upgrade durch, um diesen Inhalt zu sehen.',
        content: 'Sie haben ein aktives Abonnement — diese Karte ist sichtbar.',
      },
      whenSubscriptionToPlans: {
        title: 'Plan-Gate',
        description: 'Nur mit einem bestimmten Plan sichtbar',
        fallback: 'Sie befinden sich nicht im Pro / Enterprise / Growth-Plan.',
        content:
          'Sie sind bei Pro, Enterprise oder Growth — Premium-Inhalt freigeschaltet.',
      },
    },
    seatStatus: {
      title: 'Sitzstatus',
      description: 'Mitglieder vs. Planlimits',
      members: 'Mitglieder',
      includedSeats: 'Enthaltene Sitze',
      maxUsers: 'Max. Benutzer',
      canInvite: 'Kann einladen',
      yes: 'Ja',
      no: 'Nein',
      limitReached:
        'Sitzlimit erreicht — führen Sie ein Upgrade durch, um mehr Mitglieder einzuladen.',
    },
    quickActionButtons: {
      inviteTeam: 'Team einladen',
      manageSubscription: 'Abonnement verwalten',
      workspaceSettings: 'Arbeitsbereich-Einstellungen',
    },
    cards: {
      workspace: {
        title: 'Aktueller Arbeitsbereich',
        empty: 'Kein Arbeitsbereich ausgewählt',
      },
      role: {
        title: 'Ihre Rolle',
        empty: 'N/A',
      },
      email: {
        title: 'E-Mail-Adresse',
      },
      status: {
        title: 'Status',
        active: 'Aktiv',
        inactive: 'Inaktiv',
      },
    },
    quickActions: {
      title: 'Schnellaktionen',
      createProject: 'Projekt erstellen',
      viewReports: 'Berichte ansehen',
      inviteTeam: 'Teammitglied einladen',
    },
    pages: {
      documents: {
        title: 'Dokumente',
        description: 'Ihre Dokumente verwalten',
        placeholder: 'Dokumenteninhalt kommt hier.',
      },
      analytics: {
        title: 'Analysen',
        description: 'Ihre Analysen ansehen',
        placeholder: 'Analyseninhalt kommt hier.',
      },
      team: {
        title: 'Team',
        description: 'Ihr Team verwalten',
        placeholder: 'Teamverwaltungsinhalt kommt hier.',
      },
      settings: {
        title: 'Einstellungen',
        description: 'Ihre Einstellungen verwalten',
        placeholder: 'Einstellungsinhalt kommt hier.',
      },
    },
  },
  analytics: {
    title: 'Analysen',
    description: 'Echtzeit-Metriken des Arbeitsbereichs',
    cards: {
      plan: 'Plan',
      teamMembers: 'Teammitglieder',
      quotasTracked: 'Verfolgte Kontingente',
      creditDebits: 'Credit-Abbuchungen',
      noSubscription: 'kein Abonnement',
      unlimitedSeats: 'unbegrenzte Sitze',
      maxSeats: '{n} Sitze max.',
      totalConsumed: '{n} Einheiten insgesamt verbraucht',
      consumptionEvents: 'Verbrauchsereignisse erfasst',
    },
    quotaConsumption: {
      title: 'Kontingentverbrauch',
      empty: 'Keine Kontingente für diesen Arbeitsbereich konfiguriert.',
    },
    featureFlags: {
      title: 'Feature-Flags',
      empty: 'Keine Flags konfiguriert.',
    },
    planLimits: {
      title: 'Planlimits',
      empty: 'Keine Planlimits konfiguriert.',
      unlimited: 'unbegrenzt',
    },
    loading: 'Wird geladen…',
  },
  team: {
    title: 'Team',
    description: 'Mitglieder des Arbeitsbereichs',
    inviteMember: 'Mitglied einladen',
    seatLimitReached:
      'Sitzlimit erreicht — führen Sie ein Upgrade durch, um mehr Mitglieder einzuladen.',
    cards: {
      members: 'Mitglieder',
      includedSeats: 'Enthaltene Sitze',
      maxUsers: 'Max. Benutzer',
      availableSeats: 'Verfügbare Sitze',
    },
    memberList: {
      title: 'Mitglieder',
      count: '{count} Mitglied(er) in diesem Arbeitsbereich',
      empty:
        'Keine Mitglieder geladen. Stellen Sie sicher, dass Sie authentifiziert sind.',
      roleFallback: 'Mitglied',
    },
    manage: {
      title: 'Mitglieder verwalten',
      description:
        'Öffnen Sie das Einstellungspanel, um Rollen und Einladungen zu verwalten',
      openSettings: 'Mitgliedereinstellungen öffnen',
      permissions: 'Berechtigungen',
    },
  },
  settings: {
    title: 'Einstellungen',
    description: 'Konfiguration des Arbeitsbereichs',
    card: {
      title: 'Arbeitsbereich-Einstellungen',
      description:
        'Klicken Sie auf einen Abschnitt, um das Einstellungspanel zu öffnen',
    },
    danger: {
      openButton: 'Gefahrenzone öffnen',
    },
    sections: {
      profile: {
        label: 'Profil',
        description: 'Ihr Name, Avatar und persönliche Daten',
      },
      general: {
        label: 'Allgemein',
        description: 'Arbeitsbereichsname, Slug und grundlegende Konfiguration',
      },
      users: {
        label: 'Mitglieder & Einladungen',
        description:
          'Teammitglieder, Rollen und ausstehende Einladungen verwalten',
      },
      subscription: {
        label: 'Abonnement',
        description: 'Ihren aktuellen Plan anzeigen und ändern',
      },
      usage: {
        label: 'Nutzung',
        description: 'Kontingentverbrauch und Nutzungsverlauf',
      },
      credits: {
        label: 'Credits',
        description: 'Credit-Guthaben und Aufladoptionen',
      },
      features: {
        label: 'Feature-Flags',
        description: 'Arbeitsbereichsfunktionen aktivieren/deaktivieren',
      },
      notifications: {
        label: 'Benachrichtigungen',
        description: 'E-Mail- und Push-Benachrichtigungseinstellungen',
      },
      permissions: {
        label: 'Berechtigungen',
        description: 'Rollenbasierte Zugriffskontrolle konfigurieren',
      },
      danger: {
        label: 'Gefahrenzone',
        description: 'Arbeitsbereich löschen oder Eigentumsübertragung',
      },
    },
  },
  documents: {
    title: 'Dokumente',
    description: 'Dokumentabschnitte mit Feature-Kontrolle',
    stats: {
      featureSections: 'Feature-Abschnitte',
      featureSectionsSubtitle: 'Dokumentfunktionen',
      enabled: 'Für Arbeitsbereich aktiviert',
      enabledSubtitle: 'aktive Funktionen',
      locked: 'Gesperrt',
      lockedSubtitle: 'inaktive Funktionen',
    },
    features: {
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert',
    },
    allFeatures: {
      title: 'Alle Arbeitsbereichsfunktionen',
      description: 'Status aller Flags',
      empty: 'Keine Feature-Flags für diesen Arbeitsbereich konfiguriert.',
    },
    featureSections: {
      advancedExports: {
        label: 'Erweiterte Exporte',
        description: 'Dokumente als PDF, DOCX oder CSV exportieren',
        content: 'PDF-, Word- und CSV-Export in Ihrem Plan verfügbar.',
        lockedMessage:
          'Aktivieren Sie die Funktion "Erweiterte Exporte", um Exporte freizuschalten.',
      },
      documentSharing: {
        label: 'Dokumentfreigabe',
        description: 'Dokumente mit externen Mitarbeitern teilen',
        content: 'Freigabelinks und externer Mitarbeiterzugang sind aktiviert.',
        lockedMessage:
          'Aktivieren Sie die Dokumentfreigabe, um externen Zugang zu ermöglichen.',
      },
      eSignatures: {
        label: 'Elektronische Signaturen',
        description: 'Rechtlich bindende Unterschriften sammeln',
        content: 'Die Sammlung elektronischer Signaturen ist aktiv.',
        lockedMessage:
          'Aktivieren Sie elektronische Signaturen, um Unterschriften auf Dokumenten zu sammeln.',
      },
    },
  },
  events: {
    title: 'SDK-Ereignisprotokoll',
    description: 'Echtzeit-SDK-Ereignisse',
    clearButton: 'Leeren',
    listenCard: {
      title: 'Ereignisse werden abgehört',
      description:
        'Diese Ereignisse werden automatisch bei der SDK-Nutzung ausgelöst — wechseln Sie den Arbeitsbereich, melden Sie sich an oder laden Sie ein Mitglied ein, um sie zu sehen.',
    },
    liveCard: {
      title: 'Live-Stream',
      captured: '{count} Ereignisse erfasst',
      empty:
        'Noch keine Ereignisse. Versuchen Sie, den Arbeitsbereich zu wechseln oder die Seite neu zu laden.',
    },
    eventLabels: {
      userCreated: 'Benutzer erstellt',
      userUpdated: 'Benutzer aktualisiert',
      workspaceChanged: 'Arbeitsbereich gewechselt',
      workspaceUpdated: 'Arbeitsbereich aktualisiert',
      memberAdded: 'Mitglied hinzugefügt',
      memberRemoved: 'Mitglied entfernt',
      roleChanged: 'Rolle geändert',
      workspaceCreated: 'Arbeitsbereich erstellt',
      workspaceDeleted: 'Arbeitsbereich gelöscht',
    },
  },
  invoices: {
    title: 'Rechnungen',
    description: 'Abrechnungsverlauf',
    refresh: 'Aktualisieren',
    billingPortal: 'Abrechnungsportal',
    billingPortalOpening: 'Wird geöffnet…',
    error: 'Fehler beim Laden der Rechnungen.',
    card: {
      title: 'Rechnungsverlauf',
      found: '{count} Rechnung(en) gefunden',
      empty:
        'Noch keine Rechnungen. Rechnungen erscheinen hier nach dem Abonnieren eines kostenpflichtigen Plans.',
    },
    table: {
      date: 'Datum',
      amount: 'Betrag',
      status: 'Status',
      description: 'Beschreibung',
      links: 'Links',
      view: 'Ansehen',
      pdf: 'PDF',
      loadMore: 'Mehr laden',
    },
  },
  notifications: {
    title: 'Benachrichtigungstest',
    description: 'Testbenachrichtigungen über BuildBase SDK senden',
    pushCard: {
      title: 'Browser-Push-Benachrichtigungen',
      description:
        'Push-Benachrichtigungen des Browsers für dieses Gerät aktivieren',
      subscribed: 'Abonniert',
      notSubscribed: 'Nicht abonniert',
      subscribe: 'Abonnieren',
      unsubscribe: 'Abbestellen',
    },
    sendCard: {
      title: 'Testbenachrichtigung senden',
      description:
        'Füllen Sie die Felder aus und senden Sie eine Benachrichtigung. Die Labels {{name}}, {{workspaceName}}, {{url}} werden automatisch aufgelöst.',
    },
    fields: {
      eventSlug: 'Ereignis-Slug',
      eventSlugHint:
        'Nur Push: jeder Slug funktioniert. Für E-Mail: muss einem registrierten Ereignis entsprechen.',
      title: 'Titel',
      message: 'Nachricht',
      url: 'URL',
      target: 'Empfänger',
      channel: 'Kanal',
    },
    placeholders: {
      eventSlug: 'z.B. comment_added, deployment_success',
      title: 'Benachrichtigungstitel',
      message: 'Push-Inhalt + E-Mail-Nachricht',
      url: 'Öffnet beim Klicken auf Push',
    },
    buttons: {
      meOnly: 'Nur ich',
      allMembers: 'Alle Workspace-Mitglieder',
      both: 'Beide',
      emailOnly: 'Nur E-Mail',
      pushOnly: 'Nur Push',
      showAdvanced: 'Erweiterte Push-Optionen anzeigen',
      hideAdvanced: 'Erweiterte Push-Optionen ausblenden',
      send: 'Benachrichtigung senden',
      sending: 'Wird gesendet...',
      silent: 'Lautlos',
      requireInteraction: 'Interaktion erforderlich',
      renotify: 'Erneut benachrichtigen',
      default: 'Standard',
    },
    advanced: {
      media: 'Medien',
      behavior: 'Push-Verhalten',
      delivery: 'Zustellung',
      actions: 'Aktionsschaltflächen (max. 2)',
      iconUrl: 'Symbol-URL',
      imageUrl: 'Bild-URL',
      badgeUrl: 'Badge-URL',
      tag: 'Tag',
      tagHint:
        'Ersetzt die Benachrichtigung mit demselben Tag anstatt zu stapeln',
      behaviorHint:
        'Lautlos = kein Ton. Interaktion erforderlich = bleibt bis Benutzeraktion. Erneut benachrichtigen = Ton beim Ersetzen.',
      urgency: 'Dringlichkeit',
      ttl: 'TTL (Sekunden)',
      schedule: 'Planen (ISO 8601)',
      action1: 'Aktion 1',
      action2: 'Aktion 2',
      actionTitlePlaceholder: 'Schaltflächenbeschriftung (z.B. Antworten)',
      actionKeyPlaceholder: 'Aktionsschlüssel (z.B. reply)',
      iconUrlPlaceholder: 'Push icon (falls back to org icon)',
      imageUrlPlaceholder: 'Large image in push body',
      badgeUrlPlaceholder: 'Status bar icon (Android)',
      ttlPlaceholder: '86400 (24h default)',
    },
    context: {
      workspace: 'Arbeitsbereich:',
      user: 'Benutzer:',
      none: 'Keine Auswahl',
    },
    resultCard: {
      title: 'Antwort',
    },
    toast: {
      workspaceRequired: 'Bitte wählen Sie zuerst einen Arbeitsbereich aus',
      sent: 'Benachrichtigung an {count} Benutzer gesendet',
      notSent: 'Benachrichtigung nicht gesendet: {reason}',
      pushEnabled: 'Push-Benachrichtigungen aktiviert',
      pushDisabled: 'Push-Benachrichtigungen deaktiviert',
      pushFailed: 'Fehler beim Ändern der Push-Benachrichtigungen',
      networkError: 'Netzwerkfehler — Verbindung zum Server nicht möglich',
    },
  },
  permissions: {
    title: 'Berechtigungen',
    description: 'Echtzeit-Berechtigungsauflösung',
    cards: {
      role: 'Ihre Rolle',
      owner: 'Eigentümer',
      ownerYes: 'Ja',
      ownerNo: 'Nein',
      granted: 'Erteilte Berechtigungen',
    },
    ownerAdmin: {
      title: 'Nur Eigentümer / Administrator',
      notVisible: 'Für Ihre Rolle ({role}) nicht sichtbar.',
      visible:
        'Sie können dies sehen, weil Sie Eigentümer oder Administrator sind.',
    },
    allMembers: {
      title: 'Alle Mitglieder',
      notMember: 'Sie sind kein Mitglied dieses Arbeitsbereichs.',
      visible:
        'Sie können dies sehen, weil Sie Mitglied des Arbeitsbereichs sind.',
    },
    matrix: {
      title: 'Berechtigungsmatrix',
      description:
        'Alle Berechtigungen werden gegen Ihre aktuelle Rolle geprüft',
      denied: 'Verweigert',
      grantedStatus: 'Erteilt',
    },
  },
  profile: {
    title: 'Benutzerprofil',
    description: 'Benutzerattribute und Feature-Flags',
    identity: {
      title: 'Identität',
      subtitle: 'Von useSaaSAuth()',
      name: 'Name',
      email: 'E-Mail-Adresse',
      role: 'Rolle',
      id: 'ID',
    },
    workspaceFeatures: {
      title: 'Arbeitsbereich-Feature-Flags',
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert',
    },
    attributes: {
      title: 'Benutzerattribute',
      description: 'Benutzerdefinierte Schlüssel-Wert-Paare pro Benutzer',
      empty: 'Noch keine Attribute konfiguriert.',
      setTitle: 'Attribut setzen (Demo)',
      keyPlaceholder: 'Schlüssel (z.B. theme)',
      valuePlaceholder: 'Wert',
      saving: 'Wird gespeichert…',
      save: 'Speichern',
      saved: 'Gespeichert!',
      failed: 'Speichern fehlgeschlagen.',
    },
    userFeatures: {
      title: 'Benutzer-Feature-Flags',
      description: 'Feature-Flags auf Benutzerebene',
      empty: 'Keine Flags für diesen Benutzer konfiguriert.',
      loading: 'Wird geladen...',
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert',
    },
  },
  usage: {
    title: 'Kontingentnutzung',
    description: 'Echtzeit-Kontingentverbrauch',
    loading: 'Kontingente werden geladen...',
    error: 'Fehler beim Laden der Kontingentdaten.',
    empty: 'Keine Kontingente für diesen Arbeitsbereich konfiguriert.',
    quotaCard: {
      remaining: '{count} verbleibend',
      unlimited: 'Unbegrenzt',
      exhausted: 'Erschöpft',
      overage: 'Überschreitung',
      threshold: 'Über 80% genutzt ({pct}%) — nahe am Limit',
      overageMsg: 'Überschreitung um {count} Einheiten',
      exhaustedMsg:
        'Kontingent erschöpft — Aktionen, die dieses Kontingent nutzen, sind blockiert',
      used: 'verwendet',
      overageAllowed: '(erlaubt)',
    },
    record: {
      title: 'Nutzung erfassen',
      description: 'Kontingentnutzung manuell erfassen',
      slugPlaceholder: 'Kontingent-Slug (z.B. api_calls)',
      qtyPlaceholder: 'Menge',
      recording: 'Wird erfasst…',
      record: 'Erfassen',
      success: '{qty} Einheit(en) für „{slug}" erfasst.',
      failed: 'Nutzung konnte nicht erfasst werden.',
    },
    logs: {
      title: 'Nutzungsprotokoll',
      description: 'Aktuelle Nutzungseinträge',
      loading: 'Protokolle werden geladen…',
      empty:
        'Noch keine Nutzungseinträge. Erfassen Sie unten Nutzung, um Einträge zu sehen.',
      table: {
        quota: 'Kontingent',
        quantity: 'Menge',
        source: 'Quelle',
        date: 'Datum',
      },
    },
  },
  creditStore: {
    title: 'Credit-Pakete',
    subtitle:
      'Kaufen Sie Credits, um Premium-Funktionen wie KI-Generierung, Exporte und mehr freizuschalten.',
    buy: 'Credits kaufen',
    validFor: 'Gültig für {days} Tage',
    noExpiry: 'Kein Ablaufdatum',
    noPackages: 'Derzeit keine Credit-Pakete verfügbar.',
    error: 'Fehler beim Laden der Credit-Pakete',
  },
  pricing: {
    title: 'Preise',
    subtitle: 'Wählen Sie den Plan, der zu Ihren Bedürfnissen passt',
    billing: 'Abrechnung',
    monthly: 'Monatlich',
    quarterly: 'Vierteljährlich',
    yearly: 'Jährlich',
    perMonth: '/Monat',
    perQuarter: '/Quartal',
    perYear: '/Jahr',
    currency: 'Währung',
    quotas: 'Kontingente',
    limits: 'Limits',
    credits: 'KI-Credits',
    creditsPerPeriod: 'Credits / Zeitraum',
    features: 'Funktionen',
    included: 'Enthalten',
    perUnit: 'danach',
    loading: 'Pläne werden geladen...',
    noPlans: 'Keine Pläne verfügbar',
    error: 'Fehler beim Laden der Preise',
    meta: {
      title: 'Preise',
      description: 'Unsere Pläne und Preise ansehen',
    },
  },
  credits: {
    title: 'Credits',
    description:
      'Verwenden Sie Credits für Premium-Aktionen. Verwalten Sie Pakete in den Arbeitsbereich-Einstellungen.',
    balance: 'Credit-Guthaben',
    creditsAvailable: 'Credits verfügbar',
    manageCredits: 'Credits verwalten',
    buyCredits: 'Credits kaufen',
    choosePlan: 'Plan wählen',
    noCredits:
      'Sie haben keine Credits mehr. Kaufen Sie weitere, um weiterhin Premium-Funktionen zu nutzen.',
    buyMore: 'Credits kaufen',
    packages: {
      title: 'Credit-Pakete',
      loading: 'Pakete werden geladen…',
      error: 'Fehler beim Laden der Pakete.',
      empty: 'Noch keine Credit-Pakete konfiguriert.',
      credits: 'Credits',
      validFor: 'Gültig für {days} Tage',
      buyNow: 'Jetzt kaufen',
    },
    testConsume: {
      title: 'Credit-Verbrauch testen',
      description:
        'Verwenden Sie diese Schaltflächen, um den Credit-Verbrauch aus Ihrem Guthaben zu testen.',
      use: '{amount} verwenden',
      apiDescription: 'Test: {amount} Credits verbrauchen',
      success: '{amount} Credits verbraucht. Guthaben: {balance}',
      insufficient:
        'Nicht genügend Credits. Verfügbar: {available}, Angefordert: {requested}',
    },
    lowCredits: {
      title: 'Wenige Credits',
      description:
        'Ihr Credit-Guthaben ist niedrig. Laden Sie es jetzt auf, um Unterbrechungen zu vermeiden.',
    },
    expiring: {
      title: 'Bald ablaufende Credits',
      description: 'Credits, die in den nächsten 30 Tagen ablaufen',
      expiresIn: 'Läuft ab am {date}',
      noExpiring: 'Keine Credits laufen bald ab',
      days: '{count} Credits',
      loading: 'Wird geladen...',
    },
    transactions: {
      title: 'Transaktionsverlauf',
      description: 'Aktuelle Credit-Hinzufügungen und -Abzüge',
      empty: 'Noch keine Transaktionen',
      loading: 'Wird geladen...',
      columns: {
        type: 'Typ',
        amount: 'Betrag',
        balance: 'Guthaben danach',
        description: 'Beschreibung',
      },
      types: {
        credit: 'Gutschrift',
        debit: 'Abbuchung',
      },
    },
  },
  errors: {
    generic: {
      title: 'Etwas ist schiefgelaufen',
      description:
        'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support, wenn das Problem anhält.',
      tryAgain: 'Erneut versuchen',
      goHome: 'Zur Startseite',
    },
    notFound: {
      title: 'Seite nicht gefunden',
      description:
        'Leider konnten wir die gesuchte Seite nicht finden. Sie wurde möglicherweise verschoben oder gelöscht.',
      goBack: 'Zurück',
    },
    blogNotFound: {
      title: 'Beitrag nicht gefunden',
      description:
        'Der gesuchte Blogbeitrag existiert nicht, wurde möglicherweise entfernt oder ist in Ihrer Sprache nicht verfügbar.',
      browseAll: 'Alle Beiträge anzeigen',
    },
  },
  blog: {
    label: 'Blog',
    heading: 'Neueste Beiträge',
    description: 'Updates, Tutorials und Einblicke von unserem Team.',
    noPosts: 'Noch keine Beiträge. Schauen Sie bald wieder vorbei!',
    noPostsTag: 'Noch keine Beiträge mit diesem Tag.',
    noPostsCategory: 'Noch keine Beiträge in dieser Kategorie.',
    noPostsAuthor: 'Noch keine Beiträge von diesem Autor.',
    postsByAuthor: 'Beiträge von {name}',
    postsTaggedCount:
      '{count, plural, one {# Beitrag mit dem Tag „{tag}"} other {# Beiträge mit dem Tag „{tag}"}}',
    postsInCategoryCount:
      '{count, plural, one {# Beitrag in dieser Kategorie} other {# Beiträge in dieser Kategorie}}',
    readMore: 'Mehr lesen',
    read: 'Lesen',
    allPosts: '← Alle Beiträge',
    previous: 'Zurück',
    next: 'Weiter',
    pageOf: 'Seite {page} von {total}',
    relatedPosts: 'Ähnliche Beiträge',
    share: 'Teilen',
    rssLabel: 'RSS-Feed',
    shareAriaX: 'Auf X / Twitter teilen',
    shareAriaLinkedin: 'Auf LinkedIn teilen',
    shareAriaFacebook: 'Auf Facebook teilen',
    shareAriaCopy: 'Link kopieren',
    shareAriaCopied: 'Link kopiert!',
    search: {
      trigger: 'Beiträge suchen...',
      placeholder: 'Blog durchsuchen...',
      searching: 'Suche läuft...',
      noResults: 'Keine Ergebnisse für „{query}"',
      startTyping: 'Tippen Sie, um zu suchen...',
    },
    meta: {
      title: 'Blog',
      titlePage: 'Blog — Seite {page}',
      description: 'Neueste Beiträge, Tutorials und Updates von unserem Team.',
      tagTitle: 'Beiträge mit Tag „{tag}"',
      tagDescription: 'Alle Blog-Beiträge mit dem Tag „{tag}".',
      categoryTitle: '{category} — Blog',
      categoryDescription: 'Blog-Beiträge in der Kategorie „{category}".',
    },
  },
  changelog: {
    label: 'Änderungsprotokoll',
    heading: 'Was ist neu',
    description: 'Alle neuesten Updates, Verbesserungen und Korrekturen.',
    rssLabel: 'RSS-Feed',
    permalink: 'Permalink',
    meta: {
      title: 'Änderungsprotokoll',
      description: 'Alle neuesten Updates, Verbesserungen und Korrekturen.',
    },
  },
  cookieConsent: {
    title: 'Wir verwenden Cookies',
    descriptionBefore:
      'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Datenverkehr zu analysieren und Inhalte zu personalisieren. Sie können wählen, welche Cookies Sie zulassen möchten. Lesen Sie unsere',
    policyLinkPrivacy: 'Datenschutzrichtlinie',
    policyLinkCookie: 'Cookie-Richtlinie',
    dismissAriaLabel: 'Für jetzt schließen',
    necessary: {
      title: 'Notwendig',
      description:
        'Erforderlich für das Funktionieren der Website. Kann nicht deaktiviert werden.',
    },
    analytics: {
      title: 'Analytik',
      description:
        'Hilft uns zu verstehen, wie Besucher unsere Website nutzen.',
    },
    marketing: {
      title: 'Marketing',
      description:
        'Wird verwendet, um relevante Anzeigen zu schalten und Kampagnen zu verfolgen.',
    },
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    savePreferences: 'Einstellungen speichern',
    customize: 'Anpassen',
  },
};

export default messages;
